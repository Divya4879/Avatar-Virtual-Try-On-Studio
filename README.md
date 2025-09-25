# Avatar Virtual Try-On Studio

<div align="center">
  <h3>🎨 AI-Powered Virtual Fashion Experience</h3>
  <p>Transform your photos into avatars and try on clothing virtually using Google's Gemini AI</p>
  
  [![Deploy to Cloud Run](https://img.shields.io/badge/Deploy%20to-Cloud%20Run-blue?logo=google-cloud)](https://cloud.google.com/run)
  [![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue?logo=typescript)](https://www.typescriptlang.org/)
  [![Gemini AI](https://img.shields.io/badge/Gemini-AI-orange?logo=google)](https://ai.google.dev/)
</div>

## 🌟 Overview

Avatar Virtual Try-On Studio is a cutting-edge web application that leverages Google's Gemini AI to create personalized avatars and enable virtual clothing try-ons. Upload your photo, generate a custom avatar in various styles, and see how different outfits look on you before making a purchase.

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
   git clone <your-repo-url>
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

### Method 1: Using Deployment Script

1. **Set environment variables**
   ```bash
   export PROJECT_ID="your-gcp-project-id"
   export REGION="us-central1"
   export GEMINI_API_KEY="your-gemini-api-key"
   ```

2. **Run deployment script**
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

### Method 2: Manual Deployment

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

### Method 3: Using Service Configuration

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

## 🎯 Usage

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

## 🆘 Support

For support and questions:
- Create an issue in this repository
- Check the [Google Cloud Run documentation](https://cloud.google.com/run/docs)
- Review [Gemini AI documentation](https://ai.google.dev/docs)

## 🙏 Acknowledgments

- Google Gemini AI for powerful image generation
- Google Cloud Run for scalable deployment
- React and TypeScript communities
- Tailwind CSS for beautiful styling

---

<div align="center">
  <p>Made with ❤️ for the future of virtual fashion</p>
</div>
# Avatar-Virtual-Try-On-Studio
