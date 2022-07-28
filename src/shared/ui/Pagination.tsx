import { Button } from './Button';

type PaginationProps = {
  disabled?: boolean;
  total?: number;
  page?: number;
  pageSize?: number;
  onChange: (page: number) => void;
};

type PaginationInfoProps = {
  total: number;
  page: number;
  pageSize: number;
  isEnd: boolean;
};

const PaginationInfo = ({ total, page, pageSize, isEnd }: PaginationInfoProps) => {
  const startPerPage = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const endPerPage = total === 0 ? 0 : pageSize * page;

  return (
    <span className="font-medium text-sm">
      {startPerPage}-{isEnd ? total : endPerPage} из {total}
    </span>
  );
};

export const Pagination = ({ disabled, total = 0, page = 1, pageSize = 10, onChange }: PaginationProps) => {
  const changePage = (page: number) => {
    onChange(page);
  };
  const isStart = page === 1;
  const isEnd = page * pageSize >= total;

  return (
    <div className="flex items-center gap-x-2">
      <PaginationInfo total={total} page={page} pageSize={pageSize} isEnd={isEnd} />
      <div className="flex gap-x-2">
        <Button size="small" disabled={disabled || isStart} onClick={() => changePage(page - 1)}>
          Назад
        </Button>
        <Button size="small" disabled={disabled || isEnd} onClick={() => changePage(page + 1)}>
          Вперед
        </Button>
      </div>
    </div>
  );
};
