import { useState } from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { idGenerator } from "../../util/id-generator";
import { useEffect } from "react";

import Button from "../UI/Button";
import Input from "./Input";

function DismissKeyboar({ children }) {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
}

export default function ExpenseForm({
  onSubmit,
  submitLabel,
  cancelHandler,
  inputData,
  isEditing,
}) {
  const [inputs, setInputs] = useState({
    amount: {
      value: inputData ? inputData.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: inputData ? inputData.date.toISOString().slice(0, 10) : "",
      isValid: true,
    },
    description: {
      value: inputData ? inputData.description : "",
      isValid: true,
    },
    id: inputData ? inputData.id : "", // Utiliza a ID do objeto se estiver editando
  });
  useEffect(() => {
    if (!isEditing) {
      const initialId = idGenerator();
      setInputs((prevInputs) => ({
        ...prevInputs,
        id: initialId,
      }));
    }
  }, [isEditing]);

  function inputChangeHandler(inputId, enteredValue) {
    setInputs((prevState) => {
      return {
        ...prevState,
        [inputId]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
      id: inputs.id, // Utiliza a ID inicial armazenada no estado
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";

    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((curInput) => {
        return {
          amount: {
            value: curInput.amount.value,
            isValid: amountIsValid,
          },
          date: {
            value: curInput.date.value,
            isValid: dateIsValid,
          },
          description: {
            value: curInput.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }
    onSubmit(expenseData);
  }

  const amountIsValid = inputs.amount?.isValid;
  const dateIsValid = inputs.date?.isValid;
  const descriptionIsValid = inputs?.description.isValid;

  return (
    <DismissKeyboar>
      <View style={styles.form}>
        <Text style={styles.title}>
          {isEditing ? "Edit Expense" : "Enter Expense"}
        </Text>
        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <Input
              label="Amount"
              style={styles.rowInput}
              inputConfig={{
                keyboardType: "decimal-pad",
                onChangeText: inputChangeHandler.bind(this, "amount"),
                value: inputs.amount.value,
              }}
            />
            {!amountIsValid ? (
              <Text style={styles.textAlert}>"Invalid value."</Text>
            ) : (
              ""
            )}
          </View>
          <View style={styles.inputContainer}>
            <Input
              label="Date"
              style={styles.rowInput}
              inputConfig={{
                placeholder: "YYYY-MM-DD",
                keyboardType: "number-pad",
                maxLength: 10,
                onChangeText: inputChangeHandler.bind(this, "date"),
                value: inputs.date.value,
              }}
            />
            {!dateIsValid ? (
              <Text style={styles.textAlert}>"Invalid date."</Text>
            ) : (
              ""
            )}
          </View>
        </View>

        <Input
          label="Description"
          inputConfig={{
            multiline: true,
            onChangeText: inputChangeHandler.bind(this, "description"),
            value: inputs.description.value,
            maxLength: 29,
          }}
        />
        {!descriptionIsValid ? (
          <Text style={styles.textAlert}>"Invalid description."</Text>
        ) : (
          ""
        )}

        <View style={styles.buttons}>
          <Button style={styles.button} onPress={submitHandler}>
            {submitLabel}
          </Button>
          <Button style={styles.button} mode="flat" onPress={cancelHandler}>
            Cancel
          </Button>
        </View>
      </View>
    </DismissKeyboar>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 80,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
    height: "20%",
  },
  buttons: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  button: {
    marginHorizontal: 8,
    minWidth: "20%",
  },
  inputContainer: { flex: 1, height: 80 },
  textAlert: {
    color: "red",
    fontSize: 12,
    marginLeft: 5,
  },
});
