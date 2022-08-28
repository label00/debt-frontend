import { Select } from '../../shared/ui';
import { Option } from '../../shared/ui/Fields/Select';
import { useCachedUsersState } from './cached-users-hook';

type SelectDebtProps = {
  fieldName: string;
};

export const UserSelect = ({ fieldName }: SelectDebtProps) => {
  const { users, loading } = useCachedUsersState();

  return (
    <Select name={fieldName} label="Должник" disabled={loading}>
      <Option value={0} disabled hidden>
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
