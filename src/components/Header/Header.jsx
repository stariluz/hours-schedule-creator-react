import { IconArrowForwardUp, IconDownload, IconFileDownload, IconFileUpload, IconUpload } from "@tabler/icons-react";
import HistoryNavigation from "../HistoryNavigation/HistoryNavigation"
import Button from "../UI/Button/Button";
import './Header.css';
import FileActions from "../FileActions/FileActions";

const Header = () => {

  return (
    <div className="header">
        <HistoryNavigation />
        <FileActions/>
    </div>
  );
}
export default Header;