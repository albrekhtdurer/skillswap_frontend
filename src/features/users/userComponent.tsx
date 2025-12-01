// INFO: Компонент для тестирования Slise userSlice, пока нет jest. После написания тестов можно удалить.
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "../../features/store";
import {
  getUsers,
  usersSelector,
  usersLoadingSelector,
  selectedUserSelector,
  selectUser,
} from "../../features/users/usersSlice";
import type { User } from "../../entities/types";

const UsersTest: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector(usersSelector);
  const loading = useSelector(usersLoadingSelector);
  const selectedUser = useSelector(selectedUserSelector);

  const [selectedGender, setSelectedGender] = useState<string>("all");
  const [searchCity, setSearchCity] = useState<string>("");

  // Загружаем пользователей
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  // Фильтрация
  const filteredUsers = users.filter((user) => {
    const matchesGender =
      selectedGender === "all" || user.gender === selectedGender;
    const matchesCity = searchCity === "";

    return matchesGender && matchesCity;
  });

  // Статистика
  const stats = {
    total: users.length,
    filtered: filteredUsers.length,
    male: users.filter((u) => u.gender === "male").length,
    female: users.filter((u) => u.gender === "female").length,
  };

  if (loading) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          margin: "20px",
        }}
      >
        <h3>🔄 Загрузка пользователей...</h3>
        <p>Проверьте консоль браузера для логов</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "10px" }}>🧪 Тест слайса пользователей</h2>
      <p style={{ color: "#666", marginBottom: "20px" }}>
        Проверка работы Redux Toolkit слайса. Данные загружаются из{" "}
        <code>public/db/users.json</code>
      </p>

      {/* Статистика */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <StatCard title="Всего" value={stats.total} />
        <StatCard title="Мужчины" value={stats.male} color="#2196F3" />
        <StatCard title="Женщины" value={stats.female} color="#E91E63" />
      </div>

      {/* Фильтры */}
      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "15px",
          borderRadius: "8px",
          marginBottom: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          alignItems: "center",
        }}
      >
        <div>
          <label
            style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}
          >
            Фильтр по полу:
          </label>
          <select
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ddd",
            }}
          >
            <option value="all">Все</option>
            <option value="male">Мужчины</option>
            <option value="female">Женщины</option>
          </select>
        </div>

        <div>
          <label
            style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}
          >
            Поиск по городу:
          </label>
          <input
            type="text"
            placeholder="Введите город..."
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              width: "200px",
            }}
          />
        </div>

        <div style={{ marginLeft: "auto" }}>
          <button
            onClick={() => dispatch(getUsers())}
            style={{
              padding: "8px 16px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            🔄 Обновить данные
          </button>
        </div>
      </div>

      {/* Результаты фильтрации */}
      <div style={{ marginBottom: "10px", color: "#666" }}>
        Показано: <strong>{filteredUsers.length}</strong> из {stats.total}{" "}
        пользователей
        {(selectedGender !== "all" || searchCity) && (
          <span> (с фильтрами)</span>
        )}
      </div>

      {/* Список пользователей */}
      {filteredUsers.length === 0 ? (
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            backgroundColor: "#fff3cd",
            borderRadius: "8px",
            border: "1px solid #ffeaa7",
          }}
        >
          <h3>😕 Пользователи не найдены</h3>
          <p>Попробуйте изменить параметры фильтрации</p>
          <button
            onClick={() => {
              setSelectedGender("all");
              setSearchCity("");
            }}
            style={{
              marginTop: "10px",
              padding: "8px 16px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Сбросить фильтры
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "15px",
            marginBottom: "30px",
          }}
        >
          {filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              isSelected={selectedUser?.id === user.id}
              onSelect={() => dispatch(selectUser(user.id))}
            />
          ))}
        </div>
      )}

      {/* Детали выбранного пользователя */}
      {selectedUser && (
        <div
          style={{
            padding: "20px",
            backgroundColor: "#e3f2fd",
            borderRadius: "8px",
            border: "2px solid #2196F3",
          }}
        >
          <h3 style={{ marginTop: 0 }}>👤 Выбранный пользователь</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gap: "20px",
            }}
          >
            {/* Основная информация */}
            <div>
              <UserInfoRow label="ID" value={selectedUser.id.toString()} />
              <UserInfoRow label="Имя" value={selectedUser.name} />
              <UserInfoRow label="Возраст" value={selectedUser.age} />
            </div>

            {/* Навыки */}
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
};

// Вспомогательные компоненты
const StatCard: React.FC<{ title: string; value: number; color?: string }> = ({
  title,
  value,
  color = "#607d8b",
}) => (
  <div
    style={{
      backgroundColor: "white",
      padding: "15px",
      borderRadius: "8px",
      borderLeft: `4px solid ${color}`,
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    }}
  >
    <div style={{ fontSize: "24px", fontWeight: "bold", color }}>{value}</div>
    <div style={{ fontSize: "14px", color: "#666" }}>{title}</div>
  </div>
);

const UserCard: React.FC<{
  user: User;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ user, isSelected, onSelect }) => (
  <div
    onClick={onSelect}
    style={{
      backgroundColor: "white",
      border: isSelected ? "2px solid #2196F3" : "1px solid #e0e0e0",
      borderRadius: "8px",
      padding: "15px",
      cursor: "pointer",
      transition: "all 0.2s",
      boxShadow: isSelected
        ? "0 4px 8px rgba(33, 150, 243, 0.2)"
        : "0 2px 4px rgba(0,0,0,0.1)",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        marginBottom: "10px",
      }}
    >
      {user.avatarUrl && (
        <img
          src={user.avatarUrl}
          alt={user.name}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid #f5f5f5",
          }}
        />
      )}
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: "bold", fontSize: "16px" }}>{user.name}</div>
      </div>
    </div>

    {/* Навыки */}
  </div>
);

// @@ts-expect-error
const UserInfoRow: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div style={{ marginBottom: "8px" }}>
    <span style={{ fontWeight: "500", color: "#555" }}>{label}: </span>
    <span>{value}</span>
  </div>
);

export default UsersTest;
