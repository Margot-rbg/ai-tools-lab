import '../styles/globals.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  
  // 处理页面路由变化时的Google Analytics事件
  useEffect(() => {
    const handleRouteChange = (url) => {
      window.gtag('config', 'G-15VVK2BR85', {
        page_path: url,
      });
    };
    
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  // 根据路径确定页面类型
  const getPageType = () => {
    const { pathname } = router;
    if (pathname.startsWith('/tools/')) return 'tool';
    if (pathname.startsWith('/scenarios/')) return 'scenario';
    if (pathname.startsWith('/news/')) return 'article';
    if (pathname === '/') return 'home';
    return 'default';
  };

  // 使用页面级定义的布局，如果有的话
  const getLayout = Component.getLayout || ((page) => (
    <Layout pageType={getPageType()}>
      {page}
    </Layout>
  ));

  return getLayout(<Component {...pageProps} />);
}

export default MyApp; 