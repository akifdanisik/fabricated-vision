
import Layout from '@/components/layout/Layout';
import CategoryManager from '@/components/categories/CategoryManager';

const Categories = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <CategoryManager />
      </div>
    </Layout>
  );
};

export default Categories;
