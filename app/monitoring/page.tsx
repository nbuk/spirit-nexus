import { Metadata } from 'next';
import { MonitoringPage as MonitoringPageView } from '@/pages/monitoring';

export const metadata: Metadata = {
  title: 'Spirit monitoring',
};

export default function MonitoringPage() {
  return <MonitoringPageView />;
}
