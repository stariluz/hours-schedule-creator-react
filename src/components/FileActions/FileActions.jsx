
import { IconDownload, IconUpload } from '@tabler/icons-react';
import Button from '../UI/Button/Button';
import './FileActions.css';

import { useCurrentState, useScheduleStateDispatch, useScheduleState } from "../ScheduleCreator/ScheduleCreator";
import FileButton from '../UI/Button/FileButton';

const FileActions = () => {
  const scheduleState = useScheduleState();
  const scheduleDispatch = useScheduleStateDispatch();
  const downloadSchedule = () => {
    const content = scheduleState.history[scheduleState.currentTime];

    const data = JSON.stringify(content);
    const blob = new Blob([data], { type: "application/json" });
    const jsonObjectUrl = URL.createObjectURL(blob);
    const $actionElement = document.createElement('a');
    const date = `${(new Date()).toLocaleDateString()}_${(new Date()).toLocaleTimeString()}`;
    const filename = `Schedule_${date}.json`;
    $actionElement.download = filename;
    $actionElement.style.display = 'none';
    $actionElement.href = jsonObjectUrl;
    document.body.appendChild($actionElement);
    $actionElement.click();
    URL.revokeObjectURL(jsonObjectUrl);
  }
  const uploadSchedule = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonContent = JSON.parse(event.target.result);
        scheduleDispatch({
          task: 'loadContent',
          content: jsonContent,
        });
      } catch (error) {
        console.error('Error parsing JSON file:', error);
      }
    };
    reader.readAsText(file);
  }
  return (
    <div className="file-actions">
      <Button
        className={'btn-traslucid'}
        onClick={() => downloadSchedule()}
      >
        <IconDownload />
      </Button>
      <FileButton
        type="file"
        className={'btn-traslucid'}
        multiple={false}
        onFileChange={(file) => uploadSchedule(file)}
      >
        <IconUpload />
      </FileButton>
    </div>
  );
}
export default FileActions;