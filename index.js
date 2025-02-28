import { useState, useRef, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRCodeGenerator = () => {
  const [text, setText] = useState('https://example.com');
  const [size, setSize] = useState(200);
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [fgColor, setFgColor] = useState('#000000');
  const qrRef = useRef<HTMLDivElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSize(Number(e.target.value));
  };

  const handleBgColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBgColor(e.target.value);
  };

  const handleFgColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFgColor(e.target.value);
  };

  const downloadQRCode = () => {
    if (!qrRef.current) return;
    
    const canvas = qrRef.current.querySelector('canvas');
    if (!canvas) return;
    
    const image = canvas.toDataURL('image/png');
    const anchor = document.createElement('a');
    anchor.href = image;
    anchor.download = 'qr-code.png';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">QR Code Generator</h1>
            <p className="text-gray-600">Enter text or URL to generate a QR code</p>
          </div>

          <div className="mb-6">
            <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
              Text or URL
            </label>
            <input
              type="text"
              id="text"
              value={text}
              onChange={handleTextChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter text or URL"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                Size: {size}px
              </label>
              <input
                type="range"
                id="size"
                min="100"
                max="400"
                value={size}
                onChange={handleSizeChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div>
              <label htmlFor="bgColor" className="block text-sm font-medium text-gray-700 mb-1">
                Background Color
              </label>
              <div className="flex items-center">
                <input
                  type="color"
                  id="bgColor"
                  value={bgColor}
                  onChange={handleBgColorChange}
                  className="h-8 w-8 border border-gray-300 rounded mr-2"
                />
                <span className="text-sm text-gray-500">{bgColor}</span>
              </div>
            </div>
            
            <div>
              <label htmlFor="fgColor" className="block text-sm font-medium text-gray-700 mb-1">
                Foreground Color
              </label>
              <div className="flex items-center">
                <input
                  type="color"
                  id="fgColor"
                  value={fgColor}
                  onChange={handleFgColorChange}
                  className="h-8 w-8 border border-gray-300 rounded mr-2"
                />
                <span className="text-sm text-gray-500">{fgColor}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center mb-6">
            <div ref={qrRef} className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
              {text ? (
                <QRCodeCanvas
                  value={text}
                  size={size}
                  bgColor={bgColor}
                  fgColor={fgColor}
                  level="H"
                  includeMargin={true}
                />
              ) : (
                <div className="flex items-center justify-center" style={{ width: size, height: size }}>
                  <p className="text-gray-400 text-sm">Enter text to generate QR code</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={downloadQRCode}
              disabled={!text}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Download QR Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
