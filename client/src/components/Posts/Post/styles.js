import { makeStyles } from '@material-ui/core/styles'
import { deepPurple, blue } from '@material-ui/core/colors'

export default makeStyles((theme) => ({
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: '10px',
    height: '100%',
    margin: '0px 0px',
    position: 'relative',
  },
  cardDetails: {
    flexDirection: 'column',
    paddingLeft: '10px',
    width: '100%',
  },
  media: {
    width: '200px',
    padding: '20px',
  },
  cardAction: {
    display: 'block',
    textAlign: 'initial',
    flex: '1 0 auto',
    flexDirection: 'column',
  },
  title: {
    padding: '0 16px',
  },
  details: {
    display: 'flex',
    margin: '20px',
  },
  cardActions: {
    justifyContent: 'space-between',
    display: 'flex',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: blue[500],
  },
}))
