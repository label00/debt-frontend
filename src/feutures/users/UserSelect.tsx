import { Select } from '../../shared/ui';
import { Option } from '../../shared/ui/Fields/Select';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, fetchUsers, selectUsers } from '../../entities';

type SelectDebtProps = {
  fieldName: string;
}

export const UserSelect = ({ fieldName }: SelectDebtProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loaded } = useSelector(selectUsers);

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  return (
    <Select name={fieldName} label="Должник" disabled={!loaded}>
      <Option value={0} disabled hidden>Выберите должника</Option>
      {users.map(user => (<Option key={user.id} value={user.id}>{user.name}</Option>))}
    </Select>
  )
}
