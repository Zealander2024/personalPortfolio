import React from 'react';

interface TabsContextType {
  activeTab: number;
  setActiveTab: (index: number) => void;
}

const TabsContext = React.createContext<TabsContextType | undefined>(undefined);

export function Tabs({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="w-full">{children}</div>
    </TabsContext.Provider>
  );
}

export function TabList({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex space-x-1 border-b border-gray-200 mb-6">
      {children}
    </div>
  );
}

export function Tab({ children, index }: { children: React.ReactNode; index: number }) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error('Tab must be used within Tabs');

  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === index;

  return (
    <button
      className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
        isActive
          ? 'bg-white text-indigo-600 border-b-2 border-indigo-600'
          : 'text-gray-500 hover:text-gray-700'
      }`}
      onClick={() => setActiveTab(index)}
    >
      {children}
    </button>
  );
}

export function TabPanels({ children }: { children: React.ReactNode }) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error('TabPanels must be used within Tabs');

  return <div className="mt-4">{children}</div>;
}

export function TabPanel({ children, index }: { children: React.ReactNode; index: number }) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error('TabPanel must be used within Tabs');

  const { activeTab } = context;
  if (activeTab !== index) return null;

  return <div>{children}</div>;
} 