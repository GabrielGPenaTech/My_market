import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D0D2D8',
    alignItems: 'center',
    paddingTop: 62,
  },
  form: {
    marginTop: 42,
    width: "100%",
    paddingHorizontal: 24,
    gap: 8
  },
  logo: {
    height: 34,
    width: 134
  },
  content: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingTop: 32,
    marginTop: 24
  },
  header: {
    width: "100%",
    flexDirection: "row",
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e4e6ec",
    paddingBottom: 12,
  },
  clearButton: {
    marginLeft: "auto",
  },
  clearText: {
    fontSize: 12,
    color: "#828282",
    fontWeight: 600
  },
});
