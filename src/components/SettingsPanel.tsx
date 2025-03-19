import { useState } from "react";
import { HiCog } from "react-icons/hi";

// Define the available HDR environments
const HDR_OPTIONS = [
  "city.hdr",
  // "forest.hdr",
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

// Define available panorama images
const PANORAMA_OPTIONS = ["09.jpg", "10.jpg"];

// Define available preset models
const PRESET_MODELS = [
  { name: "None (Drag & Drop)", value: "" },
  { name: "Car", value: "car.glb" },
  { name: "City", value: "city.glb" },
  { name: "Garage", value: "garage.glb" },
  { name: "Box", value: "aobox-transformed.glb" },
];

// Define shadow color presets
const SHADOW_COLOR_PRESETS = [
  { name: "Black", value: "#000000" },
  { name: "Blue", value: "#081c76" },
  { name: "Forest Green", value: "#012c06" },
  { name: "Dawn", value: "#7a2f0f" },
];

// Define light color presets
const LIGHT_COLOR_PRESETS = [
  { name: "White", value: "#ffffff" },
  { name: "Dawn", value: "#ffd7c4" },
  { name: "Sunset", value: "#eaccc6" },
];

// Define background color presets
const BACKGROUND_COLOR_PRESETS = [
  { name: "White", value: "#ffffff" },
  { name: "Black", value: "#000000" },
  { name: "Gray", value: "#202020" },
  { name: "Warm", value: "#faf0e6" },
  { name: "Cool", value: "#e6f0fa" },
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
    enableBloom: boolean;
    useFirstPersonCamera: boolean;
    modelScale: number;
    enableCursor: boolean;
    shadowColor: string;
    enablePanorama: boolean;
    selectedPanorama: string;
    panoramaType: string;
    environmentType: string;
    enableStandardFloor: boolean;
    enableReflectiveFloor: boolean;
    backgroundColor: string;
    lightColor: string;
    lightIntensity: number;
    selectedPresetModel: string;
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

  const handleEnvironmentTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onSettingsChange({
      ...settings,
      environmentType: e.target.value,
      // Disable ground projection for studio environment as it's not compatible
      enableGroundProjection:
        e.target.value === "studio" ? false : settings.enableGroundProjection,
    });
  };

  const handlePanoramaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSettingsChange({
      ...settings,
      selectedPanorama: e.target.value,
    });
  };

  const handlePanoramaTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onSettingsChange({
      ...settings,
      panoramaType: e.target.value,
    });
  };

  const handlePresetModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSettingsChange({
      ...settings,
      selectedPresetModel: e.target.value,
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

  const handleBackgroundColorChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onSettingsChange({
      ...settings,
      backgroundColor: e.target.value,
    });
  };

  const handleLightColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({
      ...settings,
      lightColor: e.target.value,
    });
  };

  const handleLightIntensityChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      onSettingsChange({
        ...settings,
        lightIntensity: value,
      });
    }
  };

  const handleColorPreset = (colorType: string, color: string) => {
    onSettingsChange({
      ...settings,
      [colorType]: color,
    });
  };

  // Toggle panorama and disable ground projection when enabling panorama
  const togglePanorama = () => {
    const newPanoramaState = !settings.enablePanorama;
    onSettingsChange({
      ...settings,
      enablePanorama: newPanoramaState,
      // If enabling panorama, disable ground projection as it's not compatible
      enableGroundProjection: newPanoramaState
        ? false
        : settings.enableGroundProjection,
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
        <div className="absolute top-16 left-0 bg-gray-800 bg-opacity-30 backdrop-blur-sm text-white rounded-3xl shadow-xl p-4 w-120 max-h-[90vh] overflow-y-auto transition-all duration-300 border border-gray-500 ">
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

              <div className="flex flex-col space-y-3 mb-4 border-b border-gray-700 pb-4">
                <h5 className="text-sm font-medium text-blue-300 mb-2">
                  Select Model
                </h5>

                <div className="flex flex-col space-y-1">
                  <label htmlFor="preset-model-select" className="text-sm">
                    Preset Models
                  </label>
                  <select
                    id="preset-model-select"
                    value={settings.selectedPresetModel}
                    onChange={handlePresetModelChange}
                    className="bg-gray-700 text-white text-sm rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    title="Select a preset model"
                  >
                    {PRESET_MODELS.map((model) => (
                      <option key={model.value} value={model.value}>
                        {model.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-1 p-2 bg-gray-800 rounded-md text-xs text-gray-300">
                  <p className="mb-1">
                    <strong>Model Loading:</strong>
                  </p>
                  <p>• Select a preset model from the dropdown</p>
                  <p>• Or drag & drop your own .glb file</p>
                  <p>• Dropping a file will override preset selection</p>
                </div>
              </div>

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

              <div className="mt-4 border-t border-gray-700 pt-3">
                <h5 className="text-sm font-medium text-blue-300 mb-2">
                  Background Color
                </h5>

                <div className="flex flex-col space-y-1 mb-3">
                  <label htmlFor="background-color" className="text-sm">
                    Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      id="background-color"
                      type="color"
                      value={settings.backgroundColor}
                      onChange={handleBackgroundColorChange}
                      className="w-8 h-8 rounded cursor-pointer"
                      title="Select background color"
                    />
                    <input
                      type="text"
                      value={settings.backgroundColor}
                      onChange={handleBackgroundColorChange}
                      className="w-24 bg-gray-700 text-white text-sm rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      title="Enter background color hex code"
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-1 mb-3">
                  <label className="text-sm">Color Presets</label>
                  <div className="flex flex-wrap gap-2">
                    {BACKGROUND_COLOR_PRESETS.map((preset) => (
                      <button
                        key={preset.value}
                        onClick={() =>
                          handleColorPreset("backgroundColor", preset.value)
                        }
                        className="flex flex-col items-center"
                        title={`Use ${preset.name} background color`}
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

              <div className="mt-4 border-t border-gray-700 pt-3">
                <h5 className="text-sm font-medium text-blue-300 mb-2">
                  Floor Settings
                </h5>

                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="standard-floor-toggle" className="text-sm">
                    Standard Floor
                  </label>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input
                      id="standard-floor-toggle"
                      type="checkbox"
                      checked={settings.enableStandardFloor}
                      onChange={() => toggleSetting("enableStandardFloor")}
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                      title="Toggle standard floor"
                    />
                    <label
                      htmlFor="standard-floor-toggle"
                      className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                        settings.enableStandardFloor
                          ? "bg-blue-500"
                          : "bg-gray-600"
                      }`}
                    ></label>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label htmlFor="reflective-floor-toggle" className="text-sm">
                    Reflective Floor
                  </label>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input
                      id="reflective-floor-toggle"
                      type="checkbox"
                      checked={settings.enableReflectiveFloor}
                      onChange={() => toggleSetting("enableReflectiveFloor")}
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                      title="Toggle reflective floor"
                    />
                    <label
                      htmlFor="reflective-floor-toggle"
                      className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                        settings.enableReflectiveFloor
                          ? "bg-blue-500"
                          : "bg-gray-600"
                      }`}
                    ></label>
                  </div>
                </div>

                <div className="mt-2 p-2 bg-gray-800 rounded-md text-xs text-gray-300">
                  <p className="mb-1">
                    <strong>Floor Options:</strong>
                  </p>
                  <p>• Standard Floor: Simple non-reflective surface</p>
                  <p>
                    • Reflective Floor: Mirror-like surface with reflections
                  </p>
                  <p>• You can enable both or neither as needed</p>
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
                    <label htmlFor="panorama-toggle" className="text-sm">
                      Use 360° Panorama
                    </label>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input
                        id="panorama-toggle"
                        type="checkbox"
                        checked={settings.enablePanorama}
                        onChange={togglePanorama}
                        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                        title="Toggle panorama"
                      />
                      <label
                        htmlFor="panorama-toggle"
                        className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                          settings.enablePanorama
                            ? "bg-blue-500"
                            : "bg-gray-600"
                        }`}
                      ></label>
                    </div>
                  </div>

                  {settings.enablePanorama ? (
                    <div className="flex flex-col space-y-3">
                      <div className="flex flex-col space-y-1">
                        <label htmlFor="panorama-select" className="text-sm">
                          Panorama Image
                        </label>
                        <select
                          id="panorama-select"
                          value={settings.selectedPanorama}
                          onChange={handlePanoramaChange}
                          className="bg-gray-700 text-white text-sm rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          title="Select panorama image"
                        >
                          {PANORAMA_OPTIONS.map((img) => (
                            <option key={img} value={img}>
                              {img}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex flex-col space-y-1">
                        <label
                          htmlFor="panorama-type-select"
                          className="text-sm"
                        >
                          Panorama Type
                        </label>
                        <select
                          id="panorama-type-select"
                          value={settings.panoramaType}
                          onChange={handlePanoramaTypeChange}
                          className="bg-gray-700 text-white text-sm rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          title="Select panorama implementation"
                        >
                          <option value="environment">Environment Map</option>
                          <option value="sphere">Sphere Geometry</option>
                        </select>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col space-y-1 mb-3">
                        <label
                          htmlFor="environment-type-select"
                          className="text-sm"
                        >
                          Environment Type
                        </label>
                        <select
                          id="environment-type-select"
                          value={settings.environmentType}
                          onChange={handleEnvironmentTypeChange}
                          className="bg-gray-700 text-white text-sm rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          title="Select environment type"
                        >
                          <option value="hdr">HDR Environment</option>
                          <option value="studio">Studio Environment</option>
                        </select>
                      </div>

                      {settings.environmentType === "hdr" && (
                        <>
                          <div className="flex items-center justify-between">
                            <label htmlFor="ground-toggle" className="text-sm">
                              Ground Projection
                            </label>
                            <div className="relative inline-block w-10 mr-2 align-middle select-none">
                              <input
                                id="ground-toggle"
                                type="checkbox"
                                checked={settings.enableGroundProjection}
                                onChange={() =>
                                  toggleSetting("enableGroundProjection")
                                }
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
                        </>
                      )}

                      {settings.environmentType === "studio" && (
                        <div className="mt-2 p-2 bg-gray-800 rounded-md text-xs text-gray-300">
                          <p className="mb-1">
                            <strong>Studio Environment:</strong>
                          </p>
                          <p>• Custom lighting setup with lightformers</p>
                          <p>• Includes a red ring light for accent</p>
                          <p>• Great for product visualization</p>
                        </div>
                      )}
                    </>
                  )}
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

              {settings.enableLighting && (
                <div className="space-y-3 pl-2 border-l-2 border-gray-700 mt-2">
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="light-color" className="text-sm">
                      Light Color
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        id="light-color"
                        type="color"
                        value={settings.lightColor}
                        onChange={handleLightColorChange}
                        className="w-8 h-8 rounded cursor-pointer"
                        title="Select light color"
                      />
                      <input
                        type="text"
                        value={settings.lightColor}
                        onChange={handleLightColorChange}
                        className="w-24 bg-gray-700 text-white text-sm rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        title="Enter light color hex code"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-sm">Light Presets</label>
                    <div className="flex flex-wrap gap-2">
                      {LIGHT_COLOR_PRESETS.map((preset) => (
                        <button
                          key={preset.value}
                          onClick={() =>
                            handleColorPreset("lightColor", preset.value)
                          }
                          className="flex flex-col items-center"
                          title={`Use ${preset.name} light color`}
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

                  <div className="flex flex-col space-y-1 mt-3">
                    <label htmlFor="light-intensity" className="text-sm">
                      Light Intensity
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        id="light-intensity"
                        type="range"
                        min="0"
                        max="10"
                        step="0.1"
                        value={settings.lightIntensity}
                        onChange={handleLightIntensityChange}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                        title="Adjust light intensity"
                      />
                      <input
                        type="number"
                        min="0"
                        max="10"
                        step="0.1"
                        value={settings.lightIntensity}
                        onChange={handleLightIntensityChange}
                        className="w-16 bg-gray-700 text-white text-sm rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        title="Enter light intensity"
                      />
                    </div>
                  </div>
                </div>
              )}

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
                          onClick={() =>
                            handleColorPreset("shadowColor", preset.value)
                          }
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
                  SSGI post processing
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
                  Rings
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

              <div className="flex flex-col items-start">
                <div className="flex items-center justify-between w-full">
                  <label htmlFor="bloom-toggle" className="text-sm">
                    SSAO + Bloom
                  </label>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input
                      id="bloom-toggle"
                      type="checkbox"
                      checked={settings.enableBloom}
                      onChange={() => toggleSetting("enableBloom")}
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                      title="Toggle rings effect"
                    />
                    <label
                      htmlFor="bloom-toggle"
                      className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                        settings.enableBloom ? "bg-blue-500" : "bg-gray-600"
                      }`}
                    ></label>
                  </div>
                </div>

                {/* Camera Controls Section */}
                <div className="mt-4 p-2 bg-gray-800 rounded-md text-xs text-gray-300 w-full">
                  <p className="mb-1">
                    <strong>Tip:</strong>
                  </p>
                  <p>• Make sure to enable only one at a time</p>
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
