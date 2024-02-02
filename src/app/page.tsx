import MainAreaStyle from './styles/MainAreaStyle.module.css'
import PopupButton from './components/Button/PopupButton';
import ButtonStyle from './components/Button/ButtonStyle.module.css'
import PaperInkSvg from './components/SVGComponents/PaperInkSvg';
import SeaDataProvider from './components/Sea/SeaDataProvider';

export default function Home() {

  return (
    <div className={MainAreaStyle.mainarea} id='portal-root'>
      <h1 className={MainAreaStyle.header}>Message in a Bottle</h1>
      <p className={MainAreaStyle.text}>Read a note, leave a note
      <PopupButton /></p>
      <p className={MainAreaStyle.text}>Because life is too short for unread messages!</p>
      <p className={MainAreaStyle.text}>Click on any of the bottles below</p>
      <SeaDataProvider />
    </div>
  )
}
