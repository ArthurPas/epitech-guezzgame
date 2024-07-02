'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';

import * as React from 'react';

import { cn } from '@/lib/utils';

const RoomTabs = TabsPrimitive.Root;

const RoomTabsList = React.forwardRef<React.ElementRef<typeof TabsPrimitive.List>, React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>>(
    ({ className, ...props }, ref) => (
        <TabsPrimitive.List
            ref={ref}
            className={cn(
                'inline-flex h-12 items-center justify-center space-x-5 text-black ',
                className
            )}
            {...props}
        />
    )
);
RoomTabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.Trigger
        ref={ref}
        className={cn(
            'inline-flex items-center justify-center whitespace-nowrap rounded-base border-2 border-transparent px-3 py-1.5 text-sm font-heading  bg-purple-300  ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2  focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none opacity-50 data-[state=active]:border-border dark:data-[state=active]:border-darkBorder data-[state=active]:opacity-100 data-[state=active]:bg-amber-500',
            className
        )}
        {...props}
    />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.Content
        ref={ref}
        className={cn(
            'mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2',
            className
        )}
        {...props}
    />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { RoomTabs as Tabs, RoomTabsList as TabsList, TabsTrigger, TabsContent };
