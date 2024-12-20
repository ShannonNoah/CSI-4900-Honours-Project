import React, { useRef, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "../components/Header";
import CalendarRow from "../components/CalendarRow";
import { useEntryDates } from "../components/EntryDatesContext";
import { useNavigation } from "@react-navigation/native";
import { emotionColours } from "../utils/emotionColours";

const CalendarScreen = () => {
  const scrollViewRef = useRef(null); // Reference to the ScrollView
  const { entryDates, journalEntries } = useEntryDates(); // Access global state
  const navigation = useNavigation(); // For navigating to the homepage

  const months = [
    { name: "January", days: 31, startDay: 6, year: 2024, index: 0 },
    { name: "February", days: 29, startDay: 2, year: 2024, index: 1 }, // February 2024 (Leap Year)
    { name: "March", days: 31, startDay: 5, year: 2024, index: 2 },
    { name: "April", days: 30, startDay: 0, year: 2024, index: 3 },
    { name: "May", days: 31, startDay: 3, year: 2024, index: 4 },
    { name: "June", days: 30, startDay: 6, year: 2024, index: 5 },
    { name: "July", days: 31, startDay: 1, year: 2024, index: 6 },
    { name: "August", days: 31, startDay: 4, year: 2024, index: 7 },
    { name: "September", days: 30, startDay: 0, year: 2024, index: 8 },
    { name: "October", days: 31, startDay: 2, year: 2024, index: 9 },
    { name: "November", days: 30, startDay: 5, year: 2024, index: 10 },
    { name: "December", days: 31, startDay: 0, year: 2024, index: 11 },
  ];

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // Scroll to current month when the page is opened
  useEffect(() => {
    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    }, 100); // Adding a small timeout ensures the ScrollView is fully rendered
  }, []);

  // Define getEmotionColor function
  const getEmotionColor = (emotion) => {
    const normalizedEmotion = emotion.trim().toLowerCase();

    // Check if the emotion exists in the emotionColours object
    if (!emotionColours.hasOwnProperty(normalizedEmotion)) {
      console.warn(`Emotion not found in emotionColours: ${normalizedEmotion}`);
      return "#AAAAAA"; // Default gray for unknown emotions
    }

    return emotionColours[normalizedEmotion]; // Return the corresponding color
  };

  const generateGrid = (month) => {
    const totalSlots = Math.ceil((month.days + month.startDay) / 7) * 7;
    const grid = [];

    const highlightedDays = journalEntries
      .filter((entry) => {
        const [year, monthIndex, day] = entry.journalDate
          .split("-")
          .map(Number);
        return year === month.year && monthIndex - 1 === month.index; // Match year and month
      })
      .map((entry) => {
        const day = parseInt(entry.journalDate.split("-")[2], 10);
        const emotion =
          entry.topEmotions && entry.topEmotions.length > 0
            ? entry.topEmotions[0]
            : "neutral"; // Default to "neutral" if no emotion
        const color = getEmotionColor(emotion); // Get color based on the emotion
        return { day, color };
      });

    for (let i = 0; i < totalSlots; i++) {
      if (i < month.startDay || i >= month.days + month.startDay) {
        grid.push(""); // Empty slot
      } else {
        const day = i - month.startDay + 1;
        const highlightedDay = highlightedDays.find((d) => d.day === day);
        grid.push({
          day,
          isJournalDate: !!highlightedDay,
          color: highlightedDay ? highlightedDay.color : null, // Set color only for journal dates
        });
      }
    }
    return grid;
  };

  const chunkArray = (array, size) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

  const handleDayPress = (selectedDate) => {
    if (!selectedDate) {
      console.log("Empty slot clicked");
      return; // Ignore empty slots
    }

    console.log("Selected Date:", selectedDate);

    const journalEntry = journalEntries.find(
      (entry) => entry.journalDate === selectedDate
    );

    if (journalEntry) {
      console.log("Navigating to existing journal entry:", journalEntry);
      navigation.navigate("Home", { viewJournalEntry: journalEntry });
    } else {
      console.log("Creating new journal entry for date:", selectedDate);
      navigation.navigate("Home", { selectedDate });
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Journal Entries</Text>
      <ScrollView ref={scrollViewRef}>
        {months.map((month) => {
          const grid = generateGrid(month); // Pass the whole month object
          const rows = chunkArray(grid, 7);

          return (
            <View key={month.name} style={styles.monthContainer}>
              <Text style={styles.monthTitle}>
                {month.name}, {month.year}
              </Text>
              <View style={styles.weekHeader}>
                {daysOfWeek.map((day, index) => (
                  <Text key={index} style={styles.weekDay}>
                    {day}
                  </Text>
                ))}
              </View>
              {rows.map((week, index) => (
                <CalendarRow
                  key={index}
                  days={week}
                  month={month}
                  entryDates={entryDates}
                  onDayPress={handleDayPress} // Pass the click handler
                />
              ))}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 10,
    paddingBottom: 50, // Add padding to the bottom
  },
  title: {
    fontSize: 24,
    color: "#FFC0CB",
    textAlign: "center",
    marginBottom: 15,
    marginTop: 30,
    fontFamily: "LexendDeca",
  },
  monthContainer: {
    marginBottom: 35,
  },
  monthTitle: {
    fontSize: 18,
    color: "#FFF",
    textAlign: "left",
    marginBottom: 20,
  },
  weekHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  weekDay: {
    fontSize: 14,
    color: "#FFF",
    textAlign: "center",
    width: "13%",
  },
});

export default CalendarScreen;
