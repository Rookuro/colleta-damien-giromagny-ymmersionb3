import Post from './post';
import ProductApiGet from '../components/Api/Products';
// import FileUploader from './FileUploader';
import dynamic from 'next/dynamic';
import Carousel from '../components/Carousel';

const FileUploadNoSSR = dynamic(() => import('./FileUploader'), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <Carousel />
      <ProductApiGet />
      <h1>Téléchargement de photo</h1>
      <FileUploadNoSSR />
      {/* <Post /> */}
    </div>
  );
}
