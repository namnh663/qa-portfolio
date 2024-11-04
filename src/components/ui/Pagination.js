import Button from './Button';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  if (totalPages <= 1) return null; // No pagination needed if there's only one page

  return (
    <div className="flex justify-center space-x-2 mt-8">
      {Array.from({ length: totalPages }, (_, i) => (
        <Button
          key={i}
          variant={currentPage === i + 1 ? 'default' : 'outline'}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </Button>
      ))}
    </div>
  );
};

export default Pagination;