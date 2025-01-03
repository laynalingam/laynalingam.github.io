/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  CustomFileExtensions: () => CustomFileExtensions,
  default: () => main_default
});
module.exports = __toCommonJS(main_exports);
var import_obsidian3 = require("obsidian");

// src/settings.ts
var import_obsidian = require("obsidian");
var _DEFAULT_TYPES = {
  "markdown": [
    "",
    "md",
    "txt",
    "js",
    "css",
    "ts",
    "jsx",
    "tsx",
    "yaml",
    "yml",
    "sass",
    "scss",
    "tex",
    "json",
    "html"
  ]
};
var DEFAULT_SETTINGS = {
  types: _DEFAULT_TYPES,
  configIsValid: true,
  errors: {},
  allowMdOverride: false,
  mobileSettings: {
    enabled: false,
    configIsValid: true,
    types: _DEFAULT_TYPES
  }
};
var CustomFileExtensionsSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this._defaults = void 0;
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    const example = JSON.stringify(DEFAULT_SETTINGS.types, null, 2);
    containerEl.empty();
    containerEl.createEl("h2", { text: "Custom File Extensions Settings" });
    this._config = new import_obsidian.Setting(containerEl).setName("Config").setDesc("Valid entry is a JSON object who's property keys are view types and values are arrays of the file types to assign to that view.");
    let exampleText = document.createElement("div");
    exampleText.style.fontSize = "80%";
    exampleText.style.margin = "10px";
    exampleText.innerHTML = `<b>Ex</b>: <code>${example}</code>`;
    this._config.nameEl.parentElement.appendChild(exampleText);
    let configTextArea = new import_obsidian.TextAreaComponent(containerEl).setPlaceholder(example).setValue(JSON.stringify(this.plugin.settings.types, null, 2)).onChange(async (value) => {
      let parsed = null;
      let next = {
        ...this.plugin.settings
      };
      try {
        parsed = JSON.parse(value);
        next.configIsValid = true;
        next.types = parsed;
      } catch (e) {
        next.configIsValid = false;
      }
      this._updateConfigValidity(configTextArea, this.plugin.settings.configIsValid, next.configIsValid);
      await this.plugin.updateSettings(next);
      this._updateErrors();
      this._updateList();
      this._updateProfile();
    });
    configTextArea.inputEl.style.width = "100%";
    configTextArea.inputEl.style.height = "150px";
    configTextArea.inputEl.style.minHeight = "100px";
    this._mobileConfig = new import_obsidian.Setting(containerEl).setName("Mobile Specific Config").setDesc("If enabled: the config settings below will be used on mobile devices, and the above settings.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.mobileSettings.enabled).onChange(async (value) => {
        let next = {
          ...this.plugin.settings,
          mobileSettings: {
            ...this.plugin.settings.mobileSettings,
            enabled: value
          }
        };
        await this.plugin.updateSettings(next);
        this._updateMobileConfigVisible(mobileConfigField, value);
        this._updateErrors();
        this._updateList();
        this._updateProfile();
      });
      return toggle;
    });
    let mobileConfigField = new import_obsidian.TextAreaComponent(containerEl).setPlaceholder(example).setValue(this.plugin.settings.mobileSettings.types ? JSON.stringify(this.plugin.settings.mobileSettings.types, null, 2) : "").onChange(async (value) => {
      let next = {
        ...this.plugin.settings,
        mobileSettings: {
          ...this.plugin.settings.mobileSettings,
          types: void 0
        }
      };
      if (value !== "" && value !== null && value !== void 0) {
        try {
          let parsed = JSON.parse(value);
          next.mobileSettings.configIsValid = true;
          next.mobileSettings.types = parsed;
        } catch (e) {
          next.mobileSettings.configIsValid = false;
        }
      }
      this._updateConfigValidity(mobileConfigField, this.plugin.settings.mobileSettings.configIsValid, next.mobileSettings.configIsValid);
      await this.plugin.updateSettings(next);
      this._updateErrors();
      this._updateList();
      this._updateProfile();
    });
    mobileConfigField.inputEl.style.width = "100%";
    mobileConfigField.inputEl.style.height = "150px";
    mobileConfigField.inputEl.style.minHeight = "100px";
    this._updateMobileConfigVisible(mobileConfigField, this.plugin.settings.mobileSettings.enabled);
    new import_obsidian.Setting(containerEl).setName("Allow Override Of .md Extension").setDesc("If enabled: the .md extension will be allowed to override the default markdown view type. This is disabled by default to prevent unexpected behavior.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.allowMdOverride).onChange(async (value) => {
        let next = {
          ...this.plugin.settings,
          allowMdOverride: value
        };
        await this.plugin.updateSettings(next);
      });
      return toggle;
    });
    containerEl.createEl("h3", { text: "Errors" });
    this._errors = containerEl.createEl("p", { text: "None" });
    this._errors.style.whiteSpace = "pre-line";
    containerEl.createEl("h3", { text: "Active View Types and Extensions" });
    this._views = containerEl.createEl("p");
    this._views.style.whiteSpace = "pre-line";
    this._updateErrors();
    this._updateList();
    this._updateProfile();
  }
  _updateMobileConfigVisible(mobileConfigField, mobileSettingsEnabled) {
    mobileConfigField.inputEl.style.display = mobileSettingsEnabled ? "block" : "none";
  }
  _updateConfigValidity(text, prevWasValid, nextIsValid) {
    if (prevWasValid !== nextIsValid) {
      if (prevWasValid) {
        if (!this._defaults) {
          this._defaults = {
            color: text.inputEl.style.color,
            borderColor: text.inputEl.style.borderColor,
            borderWidth: text.inputEl.style.borderWidth
          };
        }
        text.inputEl.style.color = "var(--text-error)";
        text.inputEl.style.borderColor = "var(--background-modifier-error-rgb)";
        text.inputEl.style.borderWidth = "3px";
      } else if (this._defaults) {
        text.inputEl.style.color = this._defaults.color;
        text.inputEl.style.borderColor = this._defaults.borderColor;
        text.inputEl.style.borderWidth = this._defaults.borderWidth;
      }
    }
  }
  _updateErrors() {
    if (Object.keys(this.plugin.settings.errors).length === 0) {
      this._errors.innerHTML = `None`;
      this._errors.style.color = "green";
    } else {
      this._errors.innerHTML = `Errors: <ul>${Object.keys(this.plugin.settings.errors).map((k) => `<li><b>${k}</b>: ${this.plugin.settings.errors[k]}</li>`).join("")}</ul>`;
      this._errors.style.color = "var(--text-error)";
    }
  }
  _updateProfile() {
    if (this.plugin.useMobile) {
      this._mobileConfig.nameEl.innerHTML = `Mobile Specific Config&nbsp;<sup style="color: green">(active)</sup>`;
      this._config.nameEl.innerHTML = `Config&nbsp;<sup style="color: gray">(inactive)</sup>`;
    } else {
      this._config.nameEl.innerHTML = `Config&nbsp;<sup style="color: green">(active)</sup>`;
      this._mobileConfig.nameEl.innerHTML = `Mobile Specific Config&nbsp;<sup style="color: gray">(inactive)</sup>`;
    }
  }
  _updateList() {
    this._views.innerHTML = `<ul>${Object.keys(this.app.viewRegistry.viewByType).sort((a, b) => {
      let extCountForViewKeyA = this._getExtensionsForView(a).length;
      let extCountForViewKeyB = this._getExtensionsForView(b).length;
      return extCountForViewKeyB - extCountForViewKeyA;
    }).map((viewType) => {
      const extensions = this._getExtensionsForView(viewType);
      return `<li>${extensions.length > 0 ? `<b ${_copy()}>${viewType}</b>` : `<span ${_copy()} style="color: gray">${viewType}</span>`}${extensions.length ? `: ${extensions.sort((a, b) => b.length - a.length).map((ext) => ext ? `<code ${_copy()}>${ext}</code>` : `<code>""</code> <span style="color: gray"><i>(extensionless)</i></span>`).join(", ")}` : ``}</li>`;
    }).join("")}</ul>`;
    function _copy() {
      return `
      onmouseover="this.style.textDecoration='underline';" 
      onmouseout="this.style.textDecoration='none';"
      title="Click to copy"
      onclick="
        navigator.clipboard.writeText(this.innerText);
        new Notification('Custom File Extensions Plugin', {body:'Copied: \\'' + this.innerText + '\\', to clipboard.'});
      "`;
    }
  }
  _getExtensionsForView(view) {
    return Object.entries(this.app.viewRegistry.typeByExtension).filter(([, v]) => v === view).map(([ext, _]) => ext);
  }
};

// src/edit-modal.ts
var import_obsidian2 = require("obsidian");
var EditExtensionModal = class extends import_obsidian2.Modal {
  constructor(plugin, target) {
    var _a;
    super(plugin.app);
    this.plugin = plugin;
    this.target = target;
    (_a = this.target) != null ? _a : this.target = this.plugin.app.vault.getRoot();
    this._path = this.target.path.split("/").slice(0, -1).join("/");
    let lastPart = this.target.path.split("/").last();
    this._name = lastPart.split(".")[0];
    let lastParts = lastPart == null ? void 0 : lastPart.split(".");
    this._originalExtension = this._newExtension = lastParts.length == 1 ? "" : lastParts.last();
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.style.display = "flex";
    contentEl.style.flexDirection = "column";
    contentEl.style.alignItems = "center";
    const fileNameDisplay = contentEl.createEl("span");
    fileNameDisplay.style.flexGrow = "1";
    fileNameDisplay.style.marginRight = "10px";
    fileNameDisplay.style.fontWeight = "bold";
    fileNameDisplay.style.textAlign = "center";
    fileNameDisplay.innerHTML = this._buildFullPath();
    const formDiv = contentEl.createEl("div");
    formDiv.style.display = "flex";
    formDiv.style.alignItems = "center";
    const fileNameInput = new import_obsidian2.TextComponent(formDiv);
    fileNameInput.inputEl.style.flexGrow = "1";
    fileNameInput.inputEl.style.marginRight = "10px";
    fileNameInput.setValue(this._originalExtension);
    fileNameInput.inputEl.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this._submit();
      } else if (e.key === "Escape") {
        this.close();
      }
    });
    fileNameInput.onChange((value) => {
      this._newExtension = value.startsWith(".") ? value.slice(1) : value;
      fileNameDisplay.innerHTML = this._buildFullPath();
    });
    const submitButton = new import_obsidian2.ButtonComponent(formDiv);
    submitButton.setCta();
    submitButton.setButtonText("Rename");
    submitButton.onClick(() => this._submit());
  }
  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
  async _submit() {
    this.close();
    let newPath = this._buildFullPath();
    await this.app.vault.rename(this.target, newPath);
  }
  _buildFullPath() {
    return this._path + "/" + this._name + (!!this._newExtension ? "." : "") + this._newExtension;
  }
};
var edit_modal_default = EditExtensionModal;

// src/main.ts
var CustomFileExtensions = class extends import_obsidian3.Plugin {
  get settings() {
    return this._settings;
  }
  get useMobile() {
    return import_obsidian3.Platform.isMobile && this.settings.mobileSettings.enabled;
  }
  async onload() {
    super.onload();
    await this.loadSettings();
    if (this._settings.allowMdOverride) {
      this.app.viewRegistry.unregisterExtensions(["md"]);
    }
    this.registerEvent(this._buildFileContextMenuEditExtensionItem());
    this.addSettingTab(new CustomFileExtensionsSettingTab(this.app, this));
    this._apply();
  }
  _buildFileContextMenuEditExtensionItem() {
    return this.app.workspace.on("file-menu", (menu, file) => {
      menu.addItem((item) => {
        item.setTitle("Edit Extension").setIcon("pencil").onClick(() => new edit_modal_default(this, file).open());
      });
    });
  }
  onunload() {
    this._unapply(this.settings);
    try {
      this.registerExtensions([".md"], "markdown");
    } catch (e) {
    }
  }
  async loadSettings() {
    this._settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async resetSettings() {
    this._unapply(this.settings);
    await this.updateSettings(DEFAULT_SETTINGS);
    this._apply();
  }
  async updateSettings(newSettings) {
    this._unapply(newSettings);
    this._settings = newSettings;
    await this.saveData(this.settings);
    this._apply();
  }
  _apply() {
    var _a;
    if (this.useMobile) {
      this._applyConfig((_a = this.settings.mobileSettings.types) != null ? _a : this.settings.types);
    } else {
      this._applyConfig(this.settings.types);
    }
  }
  _tryToApply(fileType, view) {
    if (!this.settings.allowMdOverride && fileType === "md") {
      return;
    }
    try {
      this.registerExtensions([fileType], view);
    } catch (e) {
      let current = this.app.viewRegistry.getTypeByExtension(fileType);
      let message;
      if (current) {
        message = `${fileType} is already registered to ${current}.`;
      } else {
        message = `${e}`;
      }
      message = `Could not register extension: '${fileType}' to view type: ${view}. ${message}`;
      new Notification("Error: Custom File Extensions Plugin", {
        body: message
      });
      console.error(message);
      this._settings.errors[fileType] = message;
    }
  }
  _applyConfig(extensionsByViewType) {
    this._settings.errors = {};
    for (const view in extensionsByViewType) {
      for (const fileType of extensionsByViewType[view]) {
        this._tryToApply(fileType.toLowerCase(), view);
      }
    }
  }
  _unapply(newSettings) {
    var _a;
    if (this.useMobile) {
      this._unapplyConfig((_a = this.settings.mobileSettings.types) != null ? _a : this.settings.types, newSettings.allowMdOverride);
    } else {
      this._unapplyConfig(this.settings.types, newSettings.allowMdOverride);
    }
  }
  _unapplyConfig(extensionsByViewType, allowMdOverride) {
    for (const extension of Object.values(extensionsByViewType).flat()) {
      if (allowMdOverride || extension !== "md") {
        if (!this._settings.errors[extension]) {
          try {
            this.app.viewRegistry.unregisterExtensions([extension]);
          } catch (e) {
            const message = `Could not unregister extension: '${extension}'`;
            new Notification("Error: Custom File Extensions Plugin", {
              body: message
            });
            console.error(message);
          }
        }
      }
    }
  }
};
var main_default = CustomFileExtensions;

/* nosourcemap */