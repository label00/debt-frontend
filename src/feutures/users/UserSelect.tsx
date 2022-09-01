import { Select, Option } from 'shared/ui';
import { useCachedUsersState } from './cached-users-hook';

type SelectDebtProps = {
  fieldName: string;
};

export const UserSelect = ({ fieldName }: SelectDebtProps) => {
  const { users, loading } = useCachedUsersState();

  return (
    <Select name={fieldName} label="Должник" disabled={loading}>
      <Option value={''} disabled hidden>
        Выберите должника
      </Option>
      {users.map((user) => (
        <Option key={user.id} value={user.id}>
          {user.name}
        </Option>
      ))}
    </Select>
  );
};
