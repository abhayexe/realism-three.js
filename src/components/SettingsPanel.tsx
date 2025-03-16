import { useState } from "react";
import { HiCog } from "react-icons/hi";

// Define the available HDR environments
const HDR_OPTIONS = [
  "city.hdr",
  "garden.hdr",
  "park.hdr",
  "room.hdr",
  "room2.hdr",
  "sky.hdr",
  "sky2.hdr",
  "studio.hdr",
  "alley.hdr",
  "studio2.hdr",
  "warehouse.hdr",
  "dawn.hdr",
];

// Define shadow color presets
const SHADOW_COLOR_PRESETS = [
  { name: "Black", value: "#000000" },
  { name: "Blue", value: "#081c76" },
  { name: "Forest Green", value: "#012c06" },
  { name: "Dawn", value: "#7a2f0f" },
];

interface SettingsPanelProps {
  settings: {
    enableAccumulativeShadows: boolean;
    enableLighting: boolean;
    enableEnvironment: boolean;
    selectedHDR: string;
    enableGroundProjection: boolean;
    enablePostProcessing: boolean;
    enableSSR: boolean;
    enableRings: boolean;
    useFirstPersonCamera: boolean;
    modelScale: number;
    enableCursor: boolean;
    shadowColor: string;
  };
  onSettingsChange: (settings: any) => void;
}

export function SettingsPanel({
  settings,
  onSettingsChange,
}: SettingsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("model");

  const toggleSetting = (key: string) => {
    onSettingsChange({
      ...settings,
      [key]: !settings[key as keyof typeof settings],
    });
  };

  const handleHDRChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSettingsChange({
      ...settings,
      selectedHDR: e.target.value,
    });
  };

  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      onSettingsChange({
        ...settings,
        modelScale: value,
      });
    }
  };

  const handleShadowColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({
      ...settings,
      shadowColor: e.target.value,
    });
  };

  const handleShadowColorPreset = (color: string) => {
    onSettingsChange({
      ...settings,
      shadowColor: color,
    });
  };

  const tabs = [
    { id: "model", label: "Model" },
    { id: "environment", label: "Environment" },
    { id: "lighting", label: "Lighting" },
    { id: "effects", label: "Effects" },
    { id: "camera", label: "Camera" },
  ];

  return (
    <div className="absolute top-4 left-4 z-50">
      {/* Settings Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
        aria-label="Settings"
      >
        <HiCog className="w-6 h-6" />
      </button>

      {/* Settings Panel */}
      {isOpen && (
        <div className="absolute top-16 left-0 bg-gray-800 bg-opacity-30 backdrop-blur-sm text-white rounded-3xl shadow-xl p-4 w-120 max-h-[90vh] overflow-y-auto transition-all duration-300 border border-gray-500">
          <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
            Settings
          </h3>

          {/* Tabs Navigation */}
          <div className="flex overflow-x-auto mb-4 pb-1 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 mr-1 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Model Settings */}
          {activeTab === "model" && (
            <div className="space-y-4 bg-gray-900 bg-opacity-50 p-3 rounded-lg">
              <h4 className="text-sm font-medium text-blue-400 border-b border-gray-700 pb-1">
                Model Settings
              </h4>

              <div className="flex flex-col space-y-2">
                <label htmlFor="model-scale" className="text-sm">
                  Model Scale
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    id="model-scale"
                    type="range"
                    min="0.1"
                    max="5"
                    step="0.1"
                    value={settings.modelScale}
                    onChange={handleScaleChange}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    title="Adjust model scale"
                  />
                  <input
                    type="number"
                    min="0.1"
                    max="10"
                    step="0.1"
                    value={settings.modelScale}
                    onChange={handleScaleChange}
                    className="w-16 bg-gray-700 text-white text-sm rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    title="Enter model scale"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="cursor-toggle" className="text-sm">
                  Enable Cursor
                </label>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    id="cursor-toggle"
                    type="checkbox"
                    checked={settings.enableCursor}
                    onChange={() => toggleSetting("enableCursor")}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    title="Toggle cursor"
                  />
                  <label
                    htmlFor="cursor-toggle"
                    className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                      settings.enableCursor ? "bg-blue-500" : "bg-gray-600"
                    }`}
                  ></label>
                </div>
              </div>
            </div>
          )}

          {/* Environment Settings */}
          {activeTab === "environment" && (
            <div className="space-y-4 bg-gray-900 bg-opacity-50 p-3 rounded-lg">
              <h4 className="text-sm font-medium text-green-400 border-b border-gray-700 pb-1">
                Environment Settings
              </h4>

              <div className="flex items-center justify-between">
                <label htmlFor="environment-toggle" className="text-sm">
                  Enable Environment
                </label>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    id="environment-toggle"
                    type="checkbox"
                    checked={settings.enableEnvironment}
                    onChange={() => toggleSetting("enableEnvironment")}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    title="Toggle environment"
                  />
                  <label
                    htmlFor="environment-toggle"
                    className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                      settings.enableEnvironment ? "bg-blue-500" : "bg-gray-600"
                    }`}
                  ></label>
                </div>
              </div>

              {settings.enableEnvironment && (
                <div className="space-y-3 pl-2 border-l-2 border-gray-700 mt-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="ground-toggle" className="text-sm">
                      Ground Projection
                    </label>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input
                        id="ground-toggle"
                        type="checkbox"
                        checked={settings.enableGroundProjection}
                        onChange={() => toggleSetting("enableGroundProjection")}
                        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                        title="Toggle ground projection"
                      />
                      <label
                        htmlFor="ground-toggle"
                        className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                          settings.enableGroundProjection
                            ? "bg-blue-500"
                            : "bg-gray-600"
                        }`}
                      ></label>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label htmlFor="hdr-select" className="text-sm">
                      HDR Environment
                    </label>
                    <select
                      id="hdr-select"
                      value={settings.selectedHDR}
                      onChange={handleHDRChange}
                      className="bg-gray-700 text-white text-sm rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      title="Select HDR environment"
                    >
                      {HDR_OPTIONS.map((hdr) => (
                        <option key={hdr} value={hdr}>
                          {hdr.replace(".hdr", "")}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Lighting Settings */}
          {activeTab === "lighting" && (
            <div className="space-y-4 bg-gray-900 bg-opacity-50 p-3 rounded-lg">
              <h4 className="text-sm font-medium text-yellow-400 border-b border-gray-700 pb-1">
                Lighting Settings
              </h4>

              <div className="flex items-center justify-between">
                <label htmlFor="lighting-toggle" className="text-sm">
                  Enable Lighting
                </label>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    id="lighting-toggle"
                    type="checkbox"
                    checked={settings.enableLighting}
                    onChange={() => toggleSetting("enableLighting")}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    title="Toggle lighting"
                  />
                  <label
                    htmlFor="lighting-toggle"
                    className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                      settings.enableLighting ? "bg-blue-500" : "bg-gray-600"
                    }`}
                  ></label>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="shadows-toggle" className="text-sm">
                  Accumulative Shadows
                </label>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    id="shadows-toggle"
                    type="checkbox"
                    checked={settings.enableAccumulativeShadows}
                    onChange={() => toggleSetting("enableAccumulativeShadows")}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    title="Toggle accumulative shadows"
                  />
                  <label
                    htmlFor="shadows-toggle"
                    className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                      settings.enableAccumulativeShadows
                        ? "bg-blue-500"
                        : "bg-gray-600"
                    }`}
                  ></label>
                </div>
              </div>

              {settings.enableAccumulativeShadows && (
                <div className="space-y-3 pl-2 border-l-2 border-gray-700 mt-2">
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="shadow-color" className="text-sm">
                      Shadow Color
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        id="shadow-color"
                        type="color"
                        value={settings.shadowColor}
                        onChange={handleShadowColorChange}
                        className="w-8 h-8 rounded cursor-pointer"
                        title="Select shadow color"
                      />
                      <input
                        type="text"
                        value={settings.shadowColor}
                        onChange={handleShadowColorChange}
                        className="w-24 bg-gray-700 text-white text-sm rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        title="Enter shadow color hex code"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-sm">Color Presets</label>
                    <div className="flex flex-wrap gap-2">
                      {SHADOW_COLOR_PRESETS.map((preset) => (
                        <button
                          key={preset.value}
                          onClick={() => handleShadowColorPreset(preset.value)}
                          className="flex flex-col items-center"
                          title={`Use ${preset.name} shadow color`}
                        >
                          <div
                            className="w-6 h-6 rounded-full border border-gray-600 cursor-pointer hover:scale-110 transition-transform"
                            style={{ backgroundColor: preset.value }}
                          />
                          <span className="text-xs mt-1">{preset.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Effects Settings */}
          {activeTab === "effects" && (
            <div className="space-y-4 bg-gray-900 bg-opacity-50 p-3 rounded-lg">
              <h4 className="text-sm font-medium text-purple-400 border-b border-gray-700 pb-1">
                Visual Effects
              </h4>

              <div className="flex items-center justify-between">
                <label htmlFor="postprocessing-toggle" className="text-sm">
                  Post Processing
                </label>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    id="postprocessing-toggle"
                    type="checkbox"
                    checked={settings.enablePostProcessing}
                    onChange={() => toggleSetting("enablePostProcessing")}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    title="Toggle post processing"
                  />
                  <label
                    htmlFor="postprocessing-toggle"
                    className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                      settings.enablePostProcessing
                        ? "bg-blue-500"
                        : "bg-gray-600"
                    }`}
                  ></label>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="ssr-toggle" className="text-sm">
                  Screen Space Reflections
                </label>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    id="ssr-toggle"
                    type="checkbox"
                    checked={settings.enableSSR}
                    onChange={() => toggleSetting("enableSSR")}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    title="Toggle screen space reflections"
                  />
                  <label
                    htmlFor="ssr-toggle"
                    className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                      settings.enableSSR ? "bg-blue-500" : "bg-gray-600"
                    }`}
                  ></label>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="rings-toggle" className="text-sm">
                  Animated Rings
                </label>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    id="rings-toggle"
                    type="checkbox"
                    checked={settings.enableRings}
                    onChange={() => toggleSetting("enableRings")}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    title="Toggle rings effect"
                  />
                  <label
                    htmlFor="rings-toggle"
                    className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                      settings.enableRings ? "bg-blue-500" : "bg-gray-600"
                    }`}
                  ></label>
                </div>
              </div>
            </div>
          )}

          {/* Camera Settings */}
          {activeTab === "camera" && (
            <div className="space-y-4 bg-gray-900 bg-opacity-50 p-3 rounded-lg">
              <h4 className="text-sm font-medium text-red-400 border-b border-gray-700 pb-1">
                Camera Controls
              </h4>

              <div className="flex items-center justify-between">
                <label htmlFor="camera-toggle" className="text-sm">
                  First Person Camera
                </label>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    id="camera-toggle"
                    type="checkbox"
                    checked={settings.useFirstPersonCamera}
                    onChange={() => toggleSetting("useFirstPersonCamera")}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    title="Toggle first person camera"
                  />
                  <label
                    htmlFor="camera-toggle"
                    className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                      settings.useFirstPersonCamera
                        ? "bg-blue-500"
                        : "bg-gray-600"
                    }`}
                  ></label>
                </div>
              </div>

              <div className="mt-2 p-2 bg-gray-800 rounded-md text-xs text-gray-300">
                <p className="mb-1">
                  <strong>Camera Controls:</strong>
                </p>
                <p>• Orbit Mode: Click and drag to rotate</p>
                <p>• First Person: WASD to move, mouse to look</p>
                <p>• Space to jump in First Person mode</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
