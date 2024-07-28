
import { IconDownload, IconUpload } from '@tabler/icons-react';
import Button from '../UI/Button/Button';
import './FileActions.css';

import { useCurrentState, useScheduleStateDispatch, useScheduleState } from "../ScheduleCreator/ScheduleCreator";

const FileActions = () => {
  const state = useScheduleState();
  const downloadSchedule = () => {
    const content=state.history[state.currentTime];
    content.change="Download Schedule data";
    
    const data = JSON.stringify(content);
    const blob = new Blob([data], { type: "application/json" });
    const jsonObjectUrl = URL.createObjectURL(blob);
    const $actionElement = document.createElement('a');
    const date=`${(new Date()).toLocaleDateString()}_${(new Date()).toLocaleTimeString()}`;
    const filename = `Schedule_${date}.json`;
    $actionElement.download = filename;
    $actionElement.style.display = 'none';
    $actionElement.href = jsonObjectUrl;
    document.body.appendChild($actionElement);
    $actionElement.click();
    URL.revokeObjectURL(jsonObjectUrl);
  }
  const uploadSchedule = () => {
    scheduleDispatch({
      task: 'uploadFile',
    });
  }
  return (
    <div className="file-actions">
      <Button
        className={'btn-traslucid'}
        onClick={() => downloadSchedule()}
      >
        <IconDownload />
      </Button>
      <Button
        className={'btn-traslucid'}
        onClick={() => uploadSchedule()}
      >
        <IconUpload />
      </Button>
    </div>
  );
}
export default FileActions;