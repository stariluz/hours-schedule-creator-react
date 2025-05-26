import { IconArrowForwardUp, IconDownload, IconFileDownload, IconFileUpload, IconUpload } from "@tabler/icons-react";
import HistoryNavigation from "../HistoryNavigation/HistoryNavigation"
import Button from "../UI/Button/Button";
import './Header.css';
import FileActions from "../FileActions/FileActions";
import { useScheduleState, useScheduleStateDispatch } from "../../contexts/ScheduleContext";
import { useLang } from "../../contexts/LangContext";

const Header = () => {
  const { title, } = useScheduleState();
  const scheduleDispatch = useScheduleStateDispatch();
  const { currentTranslation } = useLang();

  const onTitleChangeEvent = (value) => {
    scheduleDispatch({
      task: 'setTitle',
      value: value,
    });
  }
  return (
    <div className="header">
      <HistoryNavigation />
      <div className="title">
        <input
          type="text"
          className="form-input"
          id="title"
          placeholder={currentTranslation.placeholders.title}
          onChange={(event) => { onTitleChangeEvent(event.target.value) }}
          value={title}
        />
      </div>
      <FileActions />
    </div>
  );
}
export default Header;