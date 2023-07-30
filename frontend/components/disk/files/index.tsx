import clsx from "clsx";
import Files from "components/disk/files/files";
import Folders from "components/disk/files/folders";
import { FormatProp, ListMethod, GdriveSelectTarget } from "hooks/disk";
import { DiskDataInterface, CurrentFolder } from "context";
import type { HoverHandler } from "hooks/disk/useGdrive";
import { GdriveLikeDiskBackbonePC } from "./gdrivebone";
import { useGdrive } from "context";

interface GdriveLikeDiskProps extends FormatProp, HoverHandler {
  data: DiskDataInterface;
  handleCurrentFolder: (e: CurrentFolder) => void;
  handleImageDisplay: (e: string) => void;
  selected: GdriveSelectTarget;
  dragged: GdriveSelectTarget;
  isLoading: boolean;
}

const EmptyContent = () => {
  return (
    <div className="mt-[5%] flex h-full w-full flex-col items-center gap-y-12">
      <img src="static/empty.jpg" className="h-[300px] w-[350px]"></img>
      <div className="text-lg font-bold text-gray-500">
        此位置目前無創建任何資料夾或是上傳任何圖片。
      </div>
    </div>
  );
};

export default function GdriveLikeDisk(props: any) {
  const {
    selected,
    dragged,
    handleImageDisplay,
    handleCurrentFolder,
    hoverHandler,
  } = props;

  const { diskData, isFetching, listMethod } = useGdrive();

  const files = diskData.files;
  const folders = diskData.folders;

  const haveContent =
    ((files && files.length > 0) || (folders && folders.length > 0)) ?? false;

  const GdriveContent = ({ haveContent }: { haveContent: boolean }) => {
    return haveContent ? (
      <div
        className={clsx(
          "relative mx-auto mb-2 flex h-full w-[92%] select-none flex-col items-start overflow-y-auto",
          `${
            listMethod === ListMethod.Lattice
              ? "mt-3 gap-y-2 xs:gap-x-6 md:gap-y-6"
              : "w-full"
          }`,
        )}
      >
        {listMethod === ListMethod.Lattice && folders && folders.length > 0 && (
          <p className="mt-2 text-gray-400 xss:w-full xss:pl-[5%] xs:w-[20%] xs:pl-[1%]">
            資料夾
          </p>
        )}
        <Folders
          listMethod={listMethod}
          folders={folders}
          handleCurrentFolder={handleCurrentFolder}
          hoverHandler={hoverHandler}
        />
        {listMethod === ListMethod.Lattice && files && files.length > 0 && (
          <p className="mt-2 pl-[1%] text-gray-400">檔案</p>
        )}
        <Files
          listMethod={listMethod}
          files={files}
          handleImageDisplay={handleImageDisplay}
        />
      </div>
    ) : (
      <EmptyContent />
    );
  };

  return isFetching ? (
    <GdriveLikeDiskBackbonePC listMethod={listMethod} />
  ) : (
    <GdriveContent haveContent={haveContent} />
  );
}
