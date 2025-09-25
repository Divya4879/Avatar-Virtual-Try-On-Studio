# Avatar Virtual Try-On Studio

<div align="center">
  <h3>🎨 AI-Powered Virtual Fashion Experience</h3>

  Check out my project here:- [Avatar Virtual Try-On Studio](https://avatar-virtual-try-on-713538752936.us-central1.run.app)

  
  [![Deployed using Cloud Run](https://img.shields.io/badge/Deploy%20to-Cloud%20Run-blue?logo=google-cloud)](https://cloud.google.com/run)
  [![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue?logo=typescript)](https://www.typescriptlang.org/)

  <img width="1920" height="1879" alt="screencapture-avatar-virtual-try-on-713538752936-us-central1-run-app-2025-09-14-14_21_37" src="https://github.com/user-attachments/assets/6e1426a7-3dfd-4e04-9aa2-a64166feb361" />
  <img width="1920" height="1522" alt="screencapture-avatar-virtual-try-on-713538752936-us-central1-run-app-2025-09-14-14_21_49" src="https://github.com/user-attachments/assets/6cb155ce-ec5f-4162-ba9f-e1fc592968cb" />
  <img width="1920" height="2101" alt="screencapture-avatar-virtual-try-on-713538752936-us-central1-run-app-2025-09-14-14_28_17" src="https://github.com/user-attachments/assets/81c92684-49d3-4618-99f5-e22d0230080f" />
  <img width="1920" height="1357" alt="screencapture-avatar-virtual-try-on-713538752936-us-central1-run-app-2025-09-14-14_28_27" src="https://github.com/user-attachments/assets/4bd459f8-2b6d-413c-9020-a0b69ab0fe09" />

  
</div>

## ✨ Overview

Avatar Virtual Try-On Studio is a cutting-edge web application that leverages Google's Gemini 2.5 Flash Image Generation to create personalized avatars and enable virtual clothing try-ons. Upload your photo, generate a custom avatar in various styles, and see how different outfits look on you before making a purchase.

## ✨ Features

- **🎭 Avatar Generation**: Transform photos into avatars with multiple styles (Hyperrealistic, Anime, Cartoon, Pixel Art, Sci-Fi)
- **👕 Virtual Try-On**: Upload clothing images and see realistic try-on results
- **📏 Custom Measurements**: Input body measurements for accurate fitting simulation
- **🖼️ Gallery System**: Save and manage your try-on results
- **📱 Responsive Design**: Optimized for desktop and mobile devices
- **🚀 Cloud-Ready**: Built for Google Cloud Run deployment
- **🔒 Secure**: Environment-based API key management

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express
- **AI**: Google Gemini 2.5 Flash Image Preview
- **Build Tool**: Vite
- **Deployment**: Docker, Google Cloud Run
- **Styling**: Tailwind CSS with custom gradients

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Google Cloud CLI (for deployment)
- Gemini API Key

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Divya4879/Avatar-Virtual-Try-On-Studio.git
   cd avatar-virtual-try-on-studio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local and add your Gemini API key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   ```
   http://localhost:3000
   ```

## ☁️ Cloud Run Deployment


### Method 1: Manual Deployment

1. **Build and push Docker image**
   ```bash
   # Set your project ID
   export PROJECT_ID="your-gcp-project-id"
   
   # Build image
   docker build -t gcr.io/$PROJECT_ID/avatar-virtual-try-on-studio .
   
   # Push to Container Registry
   docker push gcr.io/$PROJECT_ID/avatar-virtual-try-on-studio
   ```

2. **Deploy to Cloud Run**
   ```bash
   gcloud run deploy avatar-virtual-try-on-studio \
     --image gcr.io/$PROJECT_ID/avatar-virtual-try-on-studio \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --port 8080 \
     --memory 2Gi \
     --cpu 2 \
     --max-instances 10 \
     --set-env-vars "PORT=8080,API_KEY=your-gemini-api-key"
   ```

### Method 2: Using Service Configuration

```bash
# Update PROJECT_ID in service.yaml
gcloud run services replace service.yaml --region=us-central1
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `API_KEY` | Gemini API Key | Yes |
| `PORT` | Server port (default: 8080) | No |

### Cloud Run Settings

- **Memory**: 2Gi (recommended for AI processing)
- **CPU**: 2 (recommended for performance)
- **Max Instances**: 10 (adjust based on usage)
- **Timeout**: 300 seconds (for AI processing)

## 📁 Project Structure

```
avatar-virtual-try-on-studio/
├── components/
│   ├── common/           # Reusable UI components
│   ├── AvatarGenerator.tsx
│   ├── Gallery.tsx
│   ├── Header.tsx
│   ├── LandingPage.tsx
│   └── TryOnStudio.tsx
├── services/
│   └── geminiService.ts  # AI service integration
├── App.tsx              # Main application component
├── index.tsx            # Application entry point
├── types.ts             # TypeScript definitions
├── server.js            # Express server
├── Dockerfile           # Container configuration
└── deploy.sh            # Deployment script
```

## 🎯 User Flow

1. **Upload Photo**: Start by uploading a clear, full-body photo
2. **Choose Style**: Select your preferred avatar style
3. **Generate Avatar**: Wait for AI to create your personalized avatar
4. **Upload Clothing**: Add clothing images you want to try on
5. **Add Details**: Input measurements and clothing information
6. **Try On**: Generate realistic try-on results
7. **Save Results**: Store your favorite combinations in the gallery

## 🔒 Security

- API keys are managed through environment variables
- No sensitive data stored in the repository
- Secure container deployment on Cloud Run
- Client-side API key injection for frontend access

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


---

<div align="center">
  <p>Made with ❤️ for the future of virtual fashion</p>
</div>
