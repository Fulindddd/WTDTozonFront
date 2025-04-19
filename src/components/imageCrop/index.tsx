import { beforeUploadFile_Image_Crop } from '@/utils/utils';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

interface IProps {
  aspect?: number;
  aspectSlider?: boolean;
  children: JSX.Element;
  quality?: number;
}

export default function ImageCrop(props: IProps) {
  const { aspect, aspectSlider, children, quality = 0.4 } = props;
  return (
    <ImgCrop
      showGrid
      rotationSlider
      aspectSlider={aspectSlider}
      modalTitle="裁剪图片"
      modalOk="确定"
      modalCancel="取消"
      quality={quality}
      aspect={aspect}
      beforeCrop={beforeUploadFile_Image_Crop}
      onModalCancel={(resolve) => {
        resolve(Upload.LIST_IGNORE);
      }}
    >
      {children}
    </ImgCrop>
  );
}
