"use client";

import { SidebarAccordion } from "./SidebarAccordion";

export function Sidebar({ courseName }: { courseName: string }) {
  return (
    <div className="w-full space-y-4 lg:w-1/4">
      <h2 className="text-xl font-bold">Lessons</h2>
      <SidebarAccordion courseName={courseName} />
    </div>
  );
}
