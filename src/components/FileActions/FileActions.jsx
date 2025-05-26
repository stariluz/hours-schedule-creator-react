
import { IconDownload, IconPhotoDown, IconUpload } from '@tabler/icons-react';
import Button from '../UI/Button/Button';
import './FileActions.css';

import {
  useScheduleStateDispatch,
  useScheduleState,
} from "../../contexts/ScheduleContext";
import { useScheduleRef } from "../../contexts/scheduleRefContext";
import FileButton from '../UI/Button/FileButton';
import html2canvas from 'html2canvas';
import LanguageSwitcher from '../common/LanguageSwitcher/LanguageSwitcher';

const FileActions = () => {
  const scheduleState = useScheduleState();
  const scheduleDispatch = useScheduleStateDispatch();
  const scheduleRef = useScheduleRef();


  const downloadSchedule = () => {
    const currentState = scheduleState.history[scheduleState.currentTime];
    const contentToSave={
      ...currentState,
      title: scheduleState.title?.trim()
    };
    const data = JSON.stringify(contentToSave);
    const blob = new Blob([data], { type: "application/json" });
    const jsonObjectUrl = URL.createObjectURL(blob);
    const date = `${(new Date()).toLocaleDateString()}_${(new Date()).toLocaleTimeString()}`;
    const filename = scheduleState.title?.trim()
      ? `${scheduleState.title.replace(/[^a-z0-9]/gi, '_')}.json`
      : `Schedule_${date}.json`;
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

    canvas = await html2canvas(scheduleRef.current, {
      onclone: (document) => {

        if (scheduleState.title?.trim()) {
          const titleElement = document.querySelector(".calendar-title");
          if (titleElement) {
            titleElement.textContent = scheduleState.title;
          }
        }

        document.querySelector(".calendar-container").style.width = "1080px";
        document.querySelectorAll(".class-box .content").forEach((hourClas) => {
          hourClas.style.fontSize = "14px";
        });
        document.querySelectorAll(".class-box .classroom").forEach((hourClas) => {
          hourClas.style.fontSize = "14px";
        });

        // console.log(document.querySelectorAll(".class-box .content"))
        console.log(document);
      }
    });

    var imgData =
      canvas.toDataURL("image/png");

    // Now browser starts downloading 
    // it instead of just showing it
    var canvasData = imgData.replace(
      /^data:image\/png/, "data:application/octet-stream");

    const date = `${(new Date()).toLocaleDateString()}_${(new Date()).toLocaleTimeString()}`;
    const filename = scheduleState.title?.trim()
      ? `${scheduleState.title.replace(/[^a-z0-9]/gi, '_')}.png` // nombre basado en título
      : `Schedule_${date}.png`;

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
      <LanguageSwitcher></LanguageSwitcher>
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