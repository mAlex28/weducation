import { makeStyles } from "@material-ui/core/styles"
import { blue } from '@material-ui/core/colors'
export default makeStyles((theme) => ({
    conversationImg: {
        color: theme.palette.getContrastText(blue[500]),
        backgroundColor: blue[500],
        marginLeft: '15px',
    },
    conversationName: {
        fontWeight: 500,
        paddingLeft: '10px',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
    }
}))
