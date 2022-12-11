import { CustomSnackbar } from "../components/Snackbar";
import ReactDOM from 'react-dom'

export default function createSnackbar(messageType: 'error' | 'info' | 'success' | 'warning', message: string) {
    const d = document.createElement('div')
    d.id = new Date().getTime().toString()
    document.getElementById('root')?.appendChild(d)
    ReactDOM.render(
      <CustomSnackbar messageType={messageType} message={message}></CustomSnackbar>,
      document.getElementById(d.id)
    )
    setInterval(() => {   
      // Somente para limpar o DOM
      document.getElementById(d.id)?.remove()
    }, 7000);
}
  