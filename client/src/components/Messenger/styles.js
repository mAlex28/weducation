import { makeStyles } from "@material-ui/core/styles"

export default makeStyles((theme) => ({
  messenger: {
    height: "calc(100vh - 70px)",
    display: "flex",
  },
  chatMenu: {
    flex: 3.5,
    [theme.breakpoints.down("sm")]: {
      flex: 1,
    },
  },
  chatMenuInput: {
    width: "90%",
    padding: "10px 0",
    border: "none",
    borderBottom: "1px solid gray",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  chatBox: {
    flex: 5.5,
    [theme.breakpoints.down("sm")]: {
      flex: 10,
    },
  },
  chatBoxWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
  },
  chatBoxTop: {
    height: "100%",
    overflowY: "scroll",
    paddingRight: "10px",
  },
  chatBoxBottom: {
    marginTop: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  chatMessageInput: {
    width: "80%",
    height: "90px",
    padding: "10px",
  },
  chatSubmitButton: {
    width: "70px",
    height: "40px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "teal",
    color: "white",
  },
  chatOnline: {
    flex: 3,
    [theme.breakpoints.down("sm")]: {
      flex: 1,
    },
  },
  chatMenuWrapper: { padding: "10px", height: "100%" },
  chatBoxWrapper: { padding: "10px", height: "100%" },
  chatOnlineWrapper: {
    padding: "10px",
    height: "100%",
  },
  noConversationText: {
    position: "absolute",
    top: "10%",
    fontSize: "30px",
    color: "rgb(224, 220, 220)",
    cursor: "default",
  },
}))
