
import { IconDownload, IconPhotoDown, IconUpload } from '@tabler/icons-react';
import Button from '../UI/Button/Button';
import './FileActions.css';

import {
  useCurrentState,
  useScheduleStateDispatch,
  useScheduleState,
  useScheduleRef,
  useScheduleRefDispatch
} from "../ScheduleCreator/ScheduleCreator";
import FileButton from '../UI/Button/FileButton';
import html2canvas from 'html2canvas';

const FileActions = () => {
  const scheduleState = useScheduleState();
  const scheduleDispatch = useScheduleStateDispatch();
  const scheduleRef = useScheduleRef();


  const downloadSchedule = () => {
    const content = scheduleState.history[scheduleState.currentTime];

    const data = JSON.stringify(content);
    const blob = new Blob([data], { type: "application/json" });
    const jsonObjectUrl = URL.createObjectURL(blob);
    const date = `${(new Date()).toLocaleDateString()}_${(new Date()).toLocaleTimeString()}`;
    const filename = `Schedule_${date}.json`;
    const $actionElement = document.createElement('a');
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

  const downloadScheduleAsImage = async () => {
    var canvas = null;

    canvas=await html2canvas(scheduleRef.current);

    var imgData =
      canvas.toDataURL("image/png");

    // Now browser starts downloading 
    // it instead of just showing it
    var canvasData = imgData.replace(
      /^data:image\/png/, "data:application/octet-stream");

    const date = `${(new Date()).toLocaleDateString()}_${(new Date()).toLocaleTimeString()}`;
    const filename = `Schedule_${date}.png`;

    const $actionElement = document.createElement('a');
    $actionElement.download = filename;
    $actionElement.style.display = 'none';
    $actionElement.href = canvasData;
    document.body.appendChild($actionElement);
    $actionElement.click();
    URL.revokeObjectURL(canvasData);
  }
  return (
    <div className="file-actions">
      <Button
        className={'btn-traslucid'}
        onClick={() => downloadScheduleAsImage()}
      >
        <IconPhotoDown />
      </Button>

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