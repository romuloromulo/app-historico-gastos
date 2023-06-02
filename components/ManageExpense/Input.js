import { StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const colors = GlobalStyles.colors;

export default function Input({ label, inputConfig, style }) {
  const inputStyles = [styles.input];

  if (inputConfig && inputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={inputStyles} {...inputConfig} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: colors.primary200,
    marginBottom: 4,
  },
  input: {
    backgroundColor: colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: colors.primary700,
  },
  inputMultiline: {
    minHeight: 100,
    textAlign: "top",
  },
});
