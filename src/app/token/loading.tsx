import Card from '@/components/Card/Card';
import Main from '@/components/Main/Main';
import Skeleton from 'react-loading-skeleton';

const loading = () => {
  return (
    <Main>
      <Card>
        <div>
          <Skeleton height="500px" width="100%" />
        </div>
      </Card>
    </Main>
  );
};

export default loading;
