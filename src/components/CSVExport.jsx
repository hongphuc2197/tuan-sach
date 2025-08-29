import { useState } from 'react';
import { Download, Upload, Github, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { downloadCSV, getUserActionsData, generateSummaryReport } from '../utils/csvExport';
import githubService from '../services/githubService';

const CSVExport = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [showConfig, setShowConfig] = useState(false);
  const [config, setConfig] = useState({
    githubToken: '',
    githubUsername: ''
  });

  const handleDownloadCSV = () => {
    const userActions = getUserActionsData();
    if (Object.keys(userActions).length === 0) {
      alert('Không có dữ liệu để export!');
      return;
    }
    
    const fileName = `user_actions_${new Date().toISOString().split('T')[0]}.csv`;
    downloadCSV(userActions, fileName);
  };

  const handleDownloadSummary = () => {
    const userActions = getUserActionsData();
    if (Object.keys(userActions).length === 0) {
      alert('Không có dữ liệu để export!');
      return;
    }
    
    const summaryReport = generateSummaryReport(userActions);
    const blob = new Blob([summaryReport], { type: 'text/plain;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `user_actions_summary_${new Date().toISOString().split('T')[0]}.txt`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUploadToGitHub = async () => {
    if (!githubService.isConfigured()) {
      setShowConfig(true);
      return;
    }

    setIsUploading(true);
    setUploadResult(null);

    try {
      const userActions = getUserActionsData();
      if (Object.keys(userActions).length === 0) {
        throw new Error('Không có dữ liệu để upload!');
      }

      const result = await githubService.uploadUserActionsCSV(userActions);
      setUploadResult(result);

      if (result.success) {
        // Lưu config vào localStorage
        localStorage.setItem('github_token', config.githubToken);
        localStorage.setItem('github_username', config.githubUsername);
        // Cập nhật config state
        setConfig({ githubToken: config.githubToken, githubUsername: config.githubUsername });
      }

    } catch (error) {
      setUploadResult({
        success: false,
        error: error.message
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleConfigSave = () => {
    if (config.githubToken && config.githubUsername) {
      localStorage.setItem('github_token', config.githubToken);
      localStorage.setItem('github_username', config.githubUsername);
      setShowConfig(false);
      alert('Cấu hình GitHub đã được lưu!');
    } else {
      alert('Vui lòng nhập đầy đủ thông tin!');
    }
  };

  const handleConfigCancel = () => {
    setShowConfig(false);
    setConfig({ githubToken: '', githubUsername: '' });
  };

  // Load config từ localStorage
  useState(() => {
    const savedToken = localStorage.getItem('github_token');
    const savedUsername = localStorage.getItem('github_username');
    if (savedToken && savedUsername) {
      setConfig({ githubToken: savedToken, githubUsername: savedUsername });
    }
  });

  const userActions = getUserActionsData();
  const hasData = Object.keys(userActions).length > 0;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <FileText className="h-5 w-5 mr-2" />
        Export & Upload Dữ Liệu
      </h3>

      {!hasData && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
            <span className="text-yellow-800">
              Chưa có dữ liệu để export. Hãy xem chi tiết hoặc mua một số cuốn sách trước.
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Download CSV */}
        <button
          onClick={handleDownloadCSV}
          disabled={!hasData}
          className="flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          <Download className="h-5 w-5" />
          <span>Download CSV</span>
        </button>

        {/* Download Summary */}
        <button
          onClick={handleDownloadSummary}
          disabled={!hasData}
          className="flex items-center justify-center space-x-2 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          <FileText className="h-5 w-5" />
          <span>Download Summary</span>
        </button>
      </div>

      {/* Upload to GitHub */}
      <div className="border-t pt-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <Github className="h-5 w-5 mr-2" />
          Upload lên GitHub Gist
        </h4>

        <div className="space-y-4">
          <button
            onClick={handleUploadToGitHub}
            disabled={!hasData || isUploading}
            className="flex items-center justify-center space-x-2 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors w-full"
          >
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Đang upload...</span>
              </>
            ) : (
              <>
                <Upload className="h-5 w-5" />
                <span>Upload lên GitHub</span>
              </>
            )}
          </button>

          {/* Upload Result */}
          {uploadResult && (
            <div className={`p-4 rounded-lg ${
              uploadResult.success 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-center">
                {uploadResult.success ? (
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                )}
                <div>
                  <p className={`font-medium ${
                    uploadResult.success ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {uploadResult.success ? uploadResult.message : 'Upload thất bại'}
                  </p>
                  {uploadResult.success && (
                    <div className="mt-2 space-y-1 text-sm text-green-700">
                      <p>File ID: {uploadResult.gistId}</p>
                      <p>File Name: {uploadResult.fileName}</p>
                      <a 
                        href={uploadResult.gistUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Xem trên GitHub →
                      </a>
                    </div>
                  )}
                  {!uploadResult.success && (
                    <p className="text-sm text-red-700 mt-1">{uploadResult.error}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* GitHub Configuration */}
          {showConfig && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h5 className="font-medium text-gray-900 mb-3">Cấu hình GitHub</h5>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GitHub Username
                  </label>
                  <input
                    type="text"
                    value={config.githubUsername}
                    onChange={(e) => setConfig({ ...config, githubUsername: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Nhập username GitHub"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Personal Access Token
                  </label>
                  <input
                    type="password"
                    value={config.githubToken}
                    onChange={(e) => setConfig({ ...config, githubToken: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Nhập Personal Access Token"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Tạo token tại: GitHub Settings → Developer settings → Personal access tokens
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleConfigSave}
                    className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
                  >
                    Lưu cấu hình
                  </button>
                  <button
                    onClick={handleConfigCancel}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h5 className="font-medium text-blue-900 mb-2">Hướng dẫn sử dụng GitHub:</h5>
            <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
              <li>Tạo Personal Access Token tại GitHub Settings</li>
              <li>Token cần có quyền: <code>gist</code></li>
              <li>Nhập username và token vào form trên</li>
              <li>Click "Upload lên GitHub" để lưu trữ online</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSVExport; 