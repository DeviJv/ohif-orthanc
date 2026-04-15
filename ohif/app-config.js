/**
 * SPDX-FileCopyrightText: 2023-2025 Sebastien Jodongen, ICTEAM UCLouvain, Belgium,
 * and 2018-2025 Open Health Imaging Foundation
 * SPDX-License-Identifier: MIT
 */

// --- LIVE CSS INJECTION (SHADCN THEME & MOBILE) ---
(function() {
  function inject() {
    if (!document.head) {
      setTimeout(inject, 10);
      return;
    }
    if (document.getElementById('ohif-custom-theme-live')) return;

    const style = document.createElement('style');
    style.id = 'ohif-custom-theme-live';
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

      :root {
        --sh-background: #020617 !important;
        --sh-foreground: #f8fafc !important;
        --sh-primary: #3b82f6 !important;
        --sh-secondary: #0f172a !important;
        --sh-muted: #1e293b !important;
        --sh-accent: #334155 !important;
        --sh-border: #1e293b !important;

        --primary-color: var(--sh-primary) !important;
        --active-color: var(--sh-primary) !important;
        --ui-gray-dark: var(--sh-background) !important;
        --ui-gray: var(--sh-secondary) !important;
        --ui-gray-light: var(--sh-accent) !important;
        --text-primary-color: var(--sh-foreground) !important;
        
        font-family: 'Inter', sans-serif !important;
      }

      body {
        background-color: #020617 !important;
        color: #f8fafc !important;
        font-family: 'Inter', sans-serif !important;
      }

      .ohif-viewer-header {
          background-color: #020617 !important;
          border-bottom: 1px solid #1e293b !important;
      }

      .ohif-viewer-m-left, .ohif-viewer-m-right {
          background-color: #0f172a !important;
          border-color: #1e293b !important;
      }

      @media (max-width: 768px) {
          .ohif-viewer-m-left, .ohif-viewer-m-right {
              display: none !important;
          }
          .ohif-viewer-main {
              width: 100% !important;
              left: 0 !important;
              right: 0 !important;
          }
      }

      #investigational-use-dialog, 
      .investigational-use-dialog, 
      div[class*="InvestigationalUse"] {
          display: none !important;
      }
    `;
    document.head.appendChild(style);
  }
  inject();
})();

window.config = {
  extensions: [],
  modes: [],
  customizationService: {},
  showStudyList: true,
  maxNumberOfWebWorkers: 3,
  omitQuotationForMultipartRequest: true,
  showWarningMessageForCrossOrigin: true,
  showCPUFallbackMessage: true,
  showLoadingIndicator: true,
  strictZSpacingForVolumeViewport: true,
  maxNumRequests: {
    interaction: 100,
    thumbnail: 75,
    prefetch: 25,
  },
  httpErrorHandler: error => {
    if (error.status) {
      console.warn(error.status);
    } else {
      console.warn(error);
    }
  },
  // --- CUSTOMIZATION START ---
  branding: {
    logo: '/logo.png',
  },
  whiteLabeling: {
    createLogoComponentFn: function(React) {
      return React.createElement('a', {
        target: '_self',
        rel: 'noopener noreferrer',
        className: 'header-brand',
        href: '/',
        style: {
          display: 'block',
          background: 'url(/logo.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          width: '200px',
        },
      });
    },
  },
  investigationalUseDialog: {
    option: 'never',
  },
  // --- CUSTOMIZATION END ---
  hotkeys: [
    {
      commandName: 'incrementActiveViewport',
      label: 'Next Viewport',
      keys: ['right'],
    },
    {
      commandName: 'decrementActiveViewport',
      label: 'Previous Viewport',
      keys: ['left'],
    },
    { commandName: 'rotateViewportCW', label: 'Rotate Right', keys: ['r'] },
    { commandName: 'rotateViewportCCW', label: 'Rotate Left', keys: ['l'] },
    { commandName: 'invertViewport', label: 'Invert', keys: ['i'] },
    {
      commandName: 'flipViewportHorizontal',
      label: 'Flip Horizontally',
      keys: ['h'],
    },
    {
      commandName: 'flipViewportVertical',
      label: 'Flip Vertically',
      keys: ['v'],
    },
    { commandName: 'scaleUpViewport', label: 'Zoom In', keys: ['+'] },
    { commandName: 'scaleDownViewport', label: 'Zoom Out', keys: ['-'] },
    { commandName: 'fitViewportToWindow', label: 'Zoom to Fit', keys: ['='] },
    { commandName: 'resetViewport', label: 'Reset', keys: ['space'] },
    { commandName: 'nextImage', label: 'Next Image', keys: ['down'] },
    { commandName: 'previousImage', label: 'Previous Image', keys: ['up'] },
    {
      commandName: 'setToolActive',
      commandOptions: { toolName: 'Zoom' },
      label: 'Zoom',
      keys: ['z'],
    },
    {
      commandName: 'windowLevelPreset1',
      label: 'W/L Preset 1',
      keys: ['1'],
    },
    {
      commandName: 'windowLevelPreset2',
      label: 'W/L Preset 2',
      keys: ['2'],
    },
    {
      commandName: 'windowLevelPreset3',
      label: 'W/L Preset 3',
      keys: ['3'],
    },
    {
      commandName: 'windowLevelPreset4',
      label: 'W/L Preset 4',
      keys: ['4'],
    },
    {
      commandName: 'windowLevelPreset5',
      label: 'W/L Preset 5',
      keys: ['5'],
    },
    {
      commandName: 'windowLevelPreset6',
      label: 'W/L Preset 6',
      keys: ['6'],
    },
    {
      commandName: 'windowLevelPreset7',
      label: 'W/L Preset 7',
      keys: ['7'],
    },
    {
      commandName: 'windowLevelPreset8',
      label: 'W/L Preset 8',
      keys: ['8'],
    },
    {
      commandName: 'windowLevelPreset9',
      label: 'W/L Preset 9',
      keys: ['9'],
    },
  ],
};

window.config.routerBasename = '/';

if (true) {
  window.config.dataSources = [
    {
      friendlyName: 'Orthanc DICOMweb',
      namespace: '@ohif/extension-default.dataSourcesModule.dicomweb',
      sourceName: 'dicomweb',
      configuration: {
        name: 'orthanc',
        wadoRoot: window.location.protocol + '//' + window.location.hostname + '/dicom-web',
        qidoRoot: window.location.protocol + '//' + window.location.hostname + '/dicom-web',
        stowRoot: window.location.protocol + '//' + window.location.hostname + '/dicom-web',
        wadoUriRoot: window.location.protocol + '//' + window.location.hostname + '/dicom-web',
        qidoSupportsIncludeField: false,
        supportsReject: false,
        allowMultiSelectExport: true,
        imageRendering: 'wadors',
        thumbnailRendering: 'wadors',
        enableStudyLazyLoad: true,
        supportsFuzzyMatching: false,
        supportsWildcard: true,
        staticWado: true,
        singlepart: 'bulkdata,video',
        acceptHeader: [ 'multipart/related; type=application/octet-stream; transfer-syntax=*'],
        bulkDataURI: {
          enabled: true,
          relativeResolution: 'studies',
        }
      }
    }
  ];
  window.config.defaultDataSourceName = 'dicomweb';
} else {
  window.config.showStudyList = false;
  window.config.dataSources = [
    {
      friendlyName: 'Orthanc DICOM JSON',
      namespace: '@ohif/extension-default.dataSourcesModule.dicomjson',
      sourceName: 'dicomjson',
      configuration: {
        name: 'json',
      },
    }
  ];
  window.config.defaultDataSourceName = 'dicomjson';
}
