// import React, { useRef, useState } from 'react';
// import { Button, Modal } from 'antd';
// import { renderAsync } from 'docx-preview';
// import { getQuotation } from '@/axiosInstance/api';

// export default function ProtocolPreview({ id }: { id: number }) {
//   const docxContainerRef = useRef<HTMLDivElement | null>(null);
//   const [visible, setVisible] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const getFile = async () => {
//     setLoading(true);
//     const data = await getQuotation(id);
//     if (data) {
//       setVisible(true);
//       renderAsync(data, docxContainerRef.current!, undefined, { breakPages: true });
//     }
//     setLoading(false);
//   };
//   return (
//     <>
//       <Button className="protocol_button" loading={loading} onClick={getFile} type="link" style={{ padding: 0 }}>
//         查看报价单
//       </Button>
//       <Modal
//         open={visible}
//         forceRender
//         onCancel={() => {
//           setVisible(false);
//         }}
//         width={1000}
//         title="报价单"
//         centered
//         okButtonProps={{
//           style: {
//             display: 'none',
//           },
//         }}
//         cancelText="关闭"
//         closable={false}
//       >
//         <div style={{ height: 500, overflowY: 'auto' }} ref={docxContainerRef} />
//       </Modal>
//     </>
//   );
// }
