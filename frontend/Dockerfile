# Install dependencies only when needed
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Skip type checking for faster builds in this demo context
ENV NEXT_TELEMETRY_DISABLED 1
RUN npx prisma generate
RUN npm run build

# Production image, copy all the files and run next
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Optimization: Copy only necessary files for standalone output if configured, 
# but for now we'll stick to the standard build output
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
# Fix generated prisma path if needed
COPY --from=builder /app/app/generated/prisma ./app/generated/prisma

USER nextjs

EXPOSE 3001
ENV PORT 3001
ENV HOSTNAME "0.0.0.0"

CMD ["npm", "start"]
