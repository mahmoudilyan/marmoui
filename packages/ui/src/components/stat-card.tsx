'use client';

import { Card, CardContent } from './card';
import { cn } from '../lib/utils';
import { IconType } from 'react-icons';

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: IconType;
  label: string;
  value: string | number;
  description?: string;
}

export function StatCard({
  icon: Icon,
  label,
  value,
  description,
  className,
  ...props
}: StatCardProps) {
  return (
    <Card className={cn('', className)} {...props}>
      <CardContent className="px-space-md py-space-md">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
          <Icon className="h-6 w-6 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
  );
}