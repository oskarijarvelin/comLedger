export type Language = 'en' | 'fi';

export interface Translations {
  title: string;
  stop: string;
  start: string;
  settings: string;
  recording: string;
  realtime: string;
  confirmedTranscripts: string;
  startRecordingPrompt: string;
  microphoneSettings: string;
  echoCancellation: string;
  echoCancellationDesc: string;
  noiseSuppression: string;
  noiseSuppressionDesc: string;
  microphone: string;
  defaultMicrophone: string;
  apiKey: string;
  apiKeySaved: string;
  apiKeyInUse: string;
  apiKeyDefault: string;
  edit: string;
  setApiKey: string;
  remove: string;
  recordingStarted: string;
  creditsExhausted: string;
  invalidApiKey: string;
  connectionError: string;
  unknownError: string;
  apiKeySavedSuccess: string;
  apiKeyRemoved: string;
  echoCancellationEnabled: string;
  echoCancellationDisabled: string;
  noiseSuppressionEnabled: string;
  noiseSuppressionDisabled: string;
  microphoneChanged: string;
  apiKeyModalTitle: string;
  apiKeyModalDesc: string;
  getApiKey: string;
  cancel: string;
  save: string;
  poweredBy: string;
  language: string;
  languageChanged: string;
  generalSettings: string;
  exportSettings: string;
  exportPDF: string;
  exportCSV: string;
  pdfDate: string;
  pdfTotalTranscripts: string;
  noTranscriptsToExport: string;
  transcriptsExported: string;
  browserNotSupported: string;
  microphonePermissionDenied: string;
  useModernBrowser: string;
  highlightSettings: string;
  addHighlight: string;
  word: string;
  color: string;
  highlightAdded: string;
  highlightRemoved: string;
  wordPlaceholder: string;
  selectColor: string;
  partialMatching: string;
  partialMatchingDesc: string;
  partialMatchingEnabled: string;
  partialMatchingDisabled: string;
  partialMatchTooltip: string;
  clearTranscripts: string;
  viewOnGithub: string;
  firstTimeNotice1Title: string;
  firstTimeNotice1Text: string;
  firstTimeNotice2Title: string;
  firstTimeNotice2Text: string;
  dismiss: string;
  reloadWarning: string;
  transcriptOrder: string;
  newestFirst: string;
  oldestFirst: string;
  transcriptOrderChanged: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    title: "comLedger",
    stop: "Stop",
    start: "Start",
    settings: "Settings",
    recording: "Recording...",
    realtime: "Real-time",
    confirmedTranscripts: "Confirmed Transcripts",
    startRecordingPrompt: "Start recording to see transcripts...",
    microphoneSettings: "Microphone Settings",
    echoCancellation: "Echo Cancellation",
    echoCancellationDesc: "Removes echo from microphone",
    noiseSuppression: "Noise Suppression",
    noiseSuppressionDesc: "Reduces background noise",
    microphone: "Microphone",
    defaultMicrophone: "Default Microphone",
    apiKey: "API Key",
    apiKeySaved: "Saved",
    apiKeyInUse: "In use",
    apiKeyDefault: "Using server default key",
    edit: "Edit",
    setApiKey: "Set API Key",
    remove: "Remove",
    recordingStarted: "Recording started!",
    creditsExhausted: "Credits exhausted! Check your ElevenLabs account and refill credits.",
    invalidApiKey: "Invalid API key. Check your API key in settings.",
    connectionError: "Connection error",
    unknownError: "Unknown error",
    apiKeySavedSuccess: "API key saved!",
    apiKeyRemoved: "API key removed. Using server key.",
    echoCancellationEnabled: "Echo Cancellation enabled",
    echoCancellationDisabled: "Echo Cancellation disabled",
    noiseSuppressionEnabled: "Noise Suppression enabled",
    noiseSuppressionDisabled: "Noise Suppression disabled",
    microphoneChanged: "Microphone changed",
    apiKeyModalTitle: "ElevenLabs API Key",
    apiKeyModalDesc: "Enter your own ElevenLabs API key. The key is saved only in your browser (localStorage) and is not sent to the server.",
    getApiKey: "Get API Key from ElevenLabs",
    cancel: "Cancel",
    save: "Save",
    poweredBy: "Powered by ElevenLabs Scribe v2",
    language: "Language",
    languageChanged: "Language changed",
    generalSettings: "General Settings",
    exportSettings: "Export Transcripts",
    exportPDF: "Download as PDF",
    exportCSV: "Download as CSV",
    pdfDate: "Date",
    pdfTotalTranscripts: "Total Transcripts",
    noTranscriptsToExport: "No transcripts to export",
    transcriptsExported: "Transcripts exported successfully!",
    browserNotSupported: "Your browser does not support audio recording",
    microphonePermissionDenied: "Microphone permission denied. Please allow microphone access.",
    useModernBrowser: "Please use a modern browser (Chrome, Safari, Firefox)",
    highlightSettings: "Highlight Settings",
    addHighlight: "Add Highlight",
    word: "Word",
    color: "Color",
    highlightAdded: "Highlight added",
    highlightRemoved: "Highlight removed",
    wordPlaceholder: "Enter word to highlight",
    selectColor: "Select color",
    partialMatching: "Partial Matching",
    partialMatchingDesc: "Highlight word stems in inflected forms",
    partialMatchingEnabled: "Partial matching enabled",
    partialMatchingDisabled: "Partial matching disabled",
    partialMatchTooltip: "Partial match",
    clearTranscripts: "Clear All Transcripts",
    viewOnGithub: "View on GitHub",
    firstTimeNotice1Title: "Privacy Notice",
    firstTimeNotice1Text: "Transcriptions are not saved on any server. All data stays in your browser.",
    firstTimeNotice2Title: "Data Persistence",
    firstTimeNotice2Text: "Transcriptions will disappear if you reload the page. Download them before closing!",
    dismiss: "Dismiss",
    reloadWarning: "You have unsaved transcriptions. They will be lost if you reload the page. Download them first!",
    transcriptOrder: "Transcript Order",
    newestFirst: "Newest First",
    oldestFirst: "Oldest First",
    transcriptOrderChanged: "Transcript order changed",
  },
  fi: {
    title: "comLedger",
    stop: "Lopeta",
    start: "Aloita",
    settings: "Asetukset",
    recording: "Nauhoitetaan...",
    realtime: "Reaaliaikainen",
    confirmedTranscripts: "Vahvistetut Transkriptiot",
    startRecordingPrompt: "Aloita nauhoitus nähdäksesi transkriptiot...",
    microphoneSettings: "Mikrofonin asetukset",
    echoCancellation: "Echo Cancellation",
    echoCancellationDesc: "Poistaa kaiun mikrofonista",
    noiseSuppression: "Noise Suppression",
    noiseSuppressionDesc: "Vähentää taustamelua",
    microphone: "Mikrofoni",
    defaultMicrophone: "Oletusmikrofoni",
    apiKey: "API-avain",
    apiKeySaved: "Tallennettu",
    apiKeyInUse: "Käytössä",
    apiKeyDefault: "Käytetään palvelimen oletusavainta",
    edit: "Muokkaa",
    setApiKey: "Aseta API-avain",
    remove: "Poista",
    recordingStarted: "Nauhoitus aloitettu!",
    creditsExhausted: "Krediitit loppuneet! Tarkista ElevenLabs-tilisi ja täydennä krediitit.",
    invalidApiKey: "Virheellinen API-avain. Tarkista API-avain asetuksista.",
    connectionError: "Yhteysvirhe",
    unknownError: "Tuntematon virhe",
    apiKeySavedSuccess: "API-avain tallennettu!",
    apiKeyRemoved: "API-avain poistettu. Käytetään palvelimen avainta.",
    echoCancellationEnabled: "Echo Cancellation käytössä",
    echoCancellationDisabled: "Echo Cancellation pois käytöstä",
    noiseSuppressionEnabled: "Noise Suppression käytössä",
    noiseSuppressionDisabled: "Noise Suppression pois käytöstä",
    microphoneChanged: "Mikrofoni vaihdettu",
    apiKeyModalTitle: "ElevenLabs API-avain",
    apiKeyModalDesc: "Syötä oma ElevenLabs API-avaimesi. Avain tallennetaan vain selaimeesi (localStorage) eikä sitä lähetetä palvelimelle.",
    getApiKey: "Hae API-avain ElevenLabsista",
    cancel: "Peruuta",
    save: "Tallenna",
    poweredBy: "Powered by ElevenLabs Scribe v2",
    language: "Kieli",
    languageChanged: "Kieli vaihdettu",
    generalSettings: "Yleiset asetukset",
    exportSettings: "Vie transkriptiot",
    exportPDF: "Lataa PDF-tiedostona",
    exportCSV: "Lataa CSV-tiedostona",
    pdfDate: "Päivämäärä",
    pdfTotalTranscripts: "Transkriptioiden määrä",
    noTranscriptsToExport: "Ei transkriptioita vietäväksi",
    transcriptsExported: "Transkriptiot viety onnistuneesti!",
    browserNotSupported: "Selaimesi ei tue äänentallennusta",
    microphonePermissionDenied: "Mikrofonin käyttöoikeus evätty. Salli mikrofonin käyttö.",
    useModernBrowser: "Käytä modernia selainta (Chrome, Safari, Firefox)",
    highlightSettings: "Korostusasetukset",
    addHighlight: "Lisää korostus",
    word: "Sana",
    color: "Väri",
    highlightAdded: "Korostus lisätty",
    highlightRemoved: "Korostus poistettu",
    wordPlaceholder: "Kirjoita korostettava sana",
    selectColor: "Valitse väri",
    partialMatching: "Osaosumien korostus",
    partialMatchingDesc: "Korosta sanan vartalo taivutetuista muodoista",
    partialMatchingEnabled: "Osaosumien korostus päällä",
    partialMatchingDisabled: "Osaosumien korostus pois",
    partialMatchTooltip: "Osaosuma",
    clearTranscripts: "Tyhjennä kaikki transkriptiot",
    viewOnGithub: "Näytä GitHubissa",
    firstTimeNotice1Title: "Tietosuojailmoitus",
    firstTimeNotice1Text: "Transkriptioita ei tallenneta palvelimelle. Kaikki data pysyy selaimessasi.",
    firstTimeNotice2Title: "Datan säilyvyys",
    firstTimeNotice2Text: "Transkriptiot katoavat sivun päivittäessä. Muista ladata ne ennen sivun sulkemista!",
    dismiss: "Sulje",
    reloadWarning: "Sinulla on tallentamattomia transkriptioita. Ne katoavat sivun päivittäessä. Lataa ne ensin!",
    transcriptOrder: "Transkriptioiden järjestys",
    newestFirst: "Uusin ylimpänä",
    oldestFirst: "Vanhin ylimpänä",
    transcriptOrderChanged: "Transkriptioiden järjestys vaihdettu",
  }
};
