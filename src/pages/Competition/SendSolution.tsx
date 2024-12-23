import React, { useState } from "react";
import { Button, Typography, Upload, Space, Spin, message } from "antd";
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import { CheckCircleOutlined } from "@mui/icons-material";

const { Text, Title } = Typography;


const SendSolution: React.FC = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleFileChange = (info: any) => {
    setFileName(info.file.name);
    setIsUploaded(false); // Reset if re-uploading
  };

  const handleUpload = async () => {
    if (!fileName) {
      message.warning('Please select a file before uploading.');
      return;
    }

    setIsUploading(true);

    // Mock API request with a 2-second delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsUploading(false);
    setIsUploaded(true);
    message.success('File uploaded successfully!');
  };

  return (
    <>
      <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', maxWidth: '400px' }}>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Title level={5}>Загрузить результат</Title>

          {/* Initial state: File selection */}
          {!isUploading && !isUploaded && (
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              <Upload
                beforeUpload={() => false} // Prevent default upload
                onChange={handleFileChange}
                showUploadList={false} // Hide default file list
              >
                <Button icon={<UploadOutlined />}>Выбрать файл</Button>
              </Upload>
              {fileName && <Text>Выбранный файл: {fileName}</Text>}
              <Button
                type="primary"
                onClick={handleUpload}
                disabled={!fileName}
              >
                Загрузить
              </Button>
            </Space>
          )}

          {/* Uploading state */}
          {isUploading && (
            <Space direction="horizontal" size="small" align="center">
              <Spin indicator={<LoadingOutlined style={{ fontSize: 16 }} spin />} />
              <Text type="secondary">Загружается... Please wait</Text>
            </Space>
          )}

          {/* Uploaded state */}
          {isUploaded && (
            <Space direction="vertical" size="small" align="center">
              <CheckCircleOutlined style={{ fontSize: 24, color: 'green' }} />
              <Text type="success">File uploaded successfully!</Text>
              <Button onClick={() => setFileName(null)}>Upload Another File</Button>
            </Space>
          )}
        </Space>
      </div>
    </>
  );
};

export default SendSolution;