/**
 * Skeleton Loading Components
 * Provides loading states for various UI elements
 * CauseWay - Financial & Banking Consultancies
 */

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

// Base skeleton component with shimmer animation
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-[#133129]/10",
        className
      )}
    />
  );
}

// Card skeleton for service cards, training tracks, etc.
export function CardSkeleton({ className }: SkeletonProps) {
  return (
    <div className={cn("rounded-xl border border-[#133129]/10 p-6 space-y-4", className)}>
      <Skeleton className="h-12 w-12 rounded-lg" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-8 w-20 rounded-full" />
        <Skeleton className="h-8 w-24 rounded-full" />
      </div>
    </div>
  );
}

// Training track card skeleton
export function TrainingTrackSkeleton() {
  return (
    <div className="rounded-2xl p-6 bg-gradient-to-br from-[#133129]/5 to-[#133129]/10 space-y-4 animate-pulse">
      <div className="flex justify-between items-start">
        <Skeleton className="h-10 w-10 rounded-lg" />
        <Skeleton className="h-6 w-6 rounded-full" />
      </div>
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="flex gap-4 pt-2">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-24" />
      </div>
    </div>
  );
}

// Grid of training track skeletons
export function TrainingTracksGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <TrainingTrackSkeleton key={i} />
      ))}
    </div>
  );
}

// Article/Insight card skeleton
export function ArticleSkeleton() {
  return (
    <div className="rounded-lg overflow-hidden border border-[#133129]/10 animate-pulse">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex gap-4 pt-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}

// Stats skeleton for impact numbers
export function StatsSkeleton() {
  return (
    <div className="text-center space-y-2 animate-pulse">
      <Skeleton className="h-12 w-24 mx-auto" />
      <Skeleton className="h-4 w-20 mx-auto" />
    </div>
  );
}

// Stats grid skeleton
export function StatsGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <StatsSkeleton key={i} />
      ))}
    </div>
  );
}

// Hero section skeleton
export function HeroSkeleton() {
  return (
    <div className="relative h-screen flex items-center justify-center animate-pulse">
      <div className="absolute inset-0 bg-[#133129]/20" />
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 space-y-6">
        <Skeleton className="h-16 w-16 mx-auto rounded-xl" />
        <Skeleton className="h-12 w-3/4 mx-auto" />
        <Skeleton className="h-6 w-1/2 mx-auto" />
        <Skeleton className="h-20 w-full mx-auto" />
        <div className="flex gap-4 justify-center pt-4">
          <Skeleton className="h-12 w-40 rounded-lg" />
          <Skeleton className="h-12 w-40 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

// Service card skeleton
export function ServiceCardSkeleton() {
  return (
    <div className="rounded-lg p-6 border border-[#133129]/10 space-y-4 animate-pulse">
      <Skeleton className="h-14 w-14 rounded-lg" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}

// Services grid skeleton
export function ServicesGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ServiceCardSkeleton key={i} />
      ))}
    </div>
  );
}

// Form skeleton
export function FormSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-12 w-full rounded-lg" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-32 w-full rounded-lg" />
      </div>
      <Skeleton className="h-12 w-40 rounded-lg" />
    </div>
  );
}

// Table skeleton
export function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="border border-[#133129]/10 rounded-lg overflow-hidden animate-pulse">
      {/* Header */}
      <div className="bg-[#133129]/5 p-4 flex gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="p-4 flex gap-4 border-t border-[#133129]/10">
          {Array.from({ length: cols }).map((_, colIndex) => (
            <Skeleton key={colIndex} className="h-4 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

// Page loading skeleton
export function PageLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#faf9f6]">
      {/* Header skeleton */}
      <div className="h-16 bg-[#133129] animate-pulse" />
      
      {/* Hero skeleton */}
      <HeroSkeleton />
      
      {/* Content skeleton */}
      <div className="container py-16 space-y-16">
        <div className="text-center space-y-4">
          <Skeleton className="h-4 w-24 mx-auto" />
          <Skeleton className="h-10 w-1/2 mx-auto" />
          <Skeleton className="h-6 w-2/3 mx-auto" />
        </div>
        <ServicesGridSkeleton />
      </div>
    </div>
  );
}

export default Skeleton;
