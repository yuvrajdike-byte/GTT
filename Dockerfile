FROM node:20-alpine AS builder

WORKDIR /app

# Copy root and package files
COPY package*.json ./
COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/

# Install dependencies
RUN npm install
RUN npm install --prefix frontend
RUN npm install --prefix backend

# Copy source
COPY . .

# Build frontend production bundle
RUN npm run build --prefix frontend

# Production runtime stage
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=5000

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/backend ./backend
COPY --from=builder /app/frontend/dist ./frontend/dist

RUN npm install --prefix backend --omit=dev

EXPOSE 5000

CMD ["node", "backend/src/index.js"]
