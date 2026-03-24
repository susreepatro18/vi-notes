# Implementation Plan: Vi-Notes (Refined)

Vi-Notes verifies authorship by analyzing typing rhythm and behavior using an advanced "Dilution and Recovery" model.

## Proposed Changes

### [Frontend - React/Vite]
#### [MODIFY] [BasicEditor.tsx](file:///c:/Users/susre/OneDrive/Desktop/Project/frontend/src/components/BasicEditor.tsx)
- Integrate real-time logs for behavioral events.
- Upgrade UI with `lucide-react` icons and a "Writing Lab" layout.
- Add "Download Certificate" button.

#### [NEW] [analysisEngine.ts](file:///c:/Users/susre/OneDrive/Desktop/Project/frontend/src/utils/analysisEngine.ts)
- Implement the "Dilution and Recovery" model.
- Calculate scores based on manual vs. pasted ratio, revision frequency, and rhythmic variance.

#### [NEW] [pdfGenerator.ts](file:///c:/Users/susre/OneDrive/Desktop/Project/frontend/src/utils/pdfGenerator.ts)
- Use `jsPDF` to generate stylized Authorship Certificates.
- Include forensic logs and digital fingerprints.

### [Backend - Node/Express]
#### [MODIFY] [index.js](file:///c:/Users/susre/OneDrive/Desktop/Project/backend/index.js)
- Update session storage to accommodate the refined reporting metadata.

## Verification Plan
1. **Real-time Feedback**: Verify that the "Human Confidence" score updates dynamically as you type.
2. **PDF Generation**: Verify that clicking "Download Certificate" generates a high-quality PDF.
3. **Accuracy Test**: Verify that pasting a large block of text significantly drops the score, and manual typing slowly recovers it.
**: Detailed breakdowns of typing consistency and potential bot flags.
4. **Premium UI**: Minimalist, glassmorphism-based dark mode aesthetics.

## Verification
- [x] Verified high-resolution timing capture.
- [x] Verified anonymized data storage logic.
