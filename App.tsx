import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ShopPage from './components/ShopPage';
import WorkshopPage from './components/WorkshopPage';
import OurStoryPage from './components/OurStoryPage';
import CustomDesignPage from './components/CustomDesignPage';
import { Page } from './types';
import { PRODUCTS } from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('Home');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleNavigate = (page: Page, filter?: string) => {
    setCurrentPage(page);
    if (filter !== undefined) {
      setActiveFilter(filter);
    } else if (page !== 'Shop') {
      setActiveFilter(null);
    }
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'Home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'Shop':
        return <ShopPage products={PRODUCTS} initialFilter={activeFilter} onNavigate={handleNavigate} />;
      case 'Workshop':
        return <WorkshopPage />;
      case 'Our Story':
        return <OurStoryPage onNavigate={handleNavigate} />;
      case 'Custom Design':
        return <CustomDesignPage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FEFBFB]">
      <Header onNavigate={handleNavigate} currentPage={currentPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate}/>
    </div>
  );
};

export default App;
