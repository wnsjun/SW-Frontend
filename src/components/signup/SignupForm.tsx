import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { typo } from '../../styles/typography';
import { postSignup } from '../../api/auth';

const FIELDS = [
  { label: '닉네임', placeholder: '사용하실 닉네임을 입력해주세요', type: 'text', key: 'nickname' },
  { label: '아이디', placeholder: '아이디를 입력해주세요', type: 'text', key: 'id' },
  { label: '비밀번호', placeholder: '비밀번호를 입력해주세요', type: 'password', key: 'password' },
  { label: '비밀번호 확인', placeholder: '비밀번호를 다시 입력해주세요', type: 'password', key: 'passwordConfirm' },
] as const;

type FieldKey = (typeof FIELDS)[number]['key'];

// 완성형 한글(가-힣)만 허용 — 초성(ㄱ-ㅎ)·중성(ㅏ-ㅣ) 단독 입력 불가
const NICKNAME_REGEX = /^[가-힣a-zA-Z0-9]{2,10}$/;
const ID_REGEX = /^[a-z0-9]{4,15}$/;
const SPECIAL_CHARS_REGEX = /[!@#$%^&*]/;

function countPasswordCategories(pw: string): number {
  let count = 0;
  if (/[A-Z]/.test(pw)) count++;
  if (/[a-z]/.test(pw)) count++;
  if (/[0-9]/.test(pw)) count++;
  if (SPECIAL_CHARS_REGEX.test(pw)) count++;
  return count;
}

function validateField(key: FieldKey, value: string, values: Record<FieldKey, string>): string {
  switch (key) {
    case 'nickname': {
      if (!value) return '닉네임을 입력해주세요.';
      if (value.length < 2 || value.length > 10) return '닉네임은 2자 이상 10자 이하로 입력해주세요.';
      if (!NICKNAME_REGEX.test(value))
        return '한글(완성형), 영문, 숫자만 사용 가능합니다. (공백·특수문자·초성/중성 불가)';
      return '';
    }
    case 'id': {
      if (!value) return '아이디를 입력해주세요.';
      if (value.length < 4 || value.length > 15) return '아이디는 4자 이상 15자 이하로 입력해주세요.';
      if (!ID_REGEX.test(value)) return '영문 소문자와 숫자만 사용 가능합니다. (대문자·특수문자·공백 불가)';
      return '';
    }
    case 'password': {
      if (!value) return '비밀번호를 입력해주세요.';
      if (value.length < 8 || value.length > 20) return '비밀번호는 8자 이상 20자 이하로 입력해주세요.';
      if (countPasswordCategories(value) < 2)
        return '영문 대/소문자, 숫자, 특수문자(!@#$%^&*) 중 2가지 이상을 조합해주세요.';
      return '';
    }
    case 'passwordConfirm': {
      if (!value) return '비밀번호 확인을 입력해주세요.';
      if (value !== values.password) return '비밀번호가 일치하지 않습니다.';
      return '';
    }
    default:
      return '';
  }
}

export default function SignupForm() {
  const navigate = useNavigate();
  const [values, setValues] = useState<Record<FieldKey, string>>({
    nickname: '',
    id: '',
    password: '',
    passwordConfirm: '',
  });
  const [errors, setErrors] = useState<Record<FieldKey, string>>({
    nickname: '',
    id: '',
    password: '',
    passwordConfirm: '',
  });
  const [submitError, setSubmitError] = useState('');

  const handleChange = (key: FieldKey, value: string) => {
    const newValues = { ...values, [key]: value };
    setValues(newValues);
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: validateField(key, value, newValues) }));
    }
    // password 변경 시 이미 에러가 표시된 passwordConfirm도 재검사
    if (key === 'password' && errors.passwordConfirm) {
      setErrors((prev) => ({
        ...prev,
        passwordConfirm: validateField('passwordConfirm', values.passwordConfirm, newValues),
      }));
    }
  };

  const handleBlur = (key: FieldKey) => {
    setErrors((prev) => ({ ...prev, [key]: validateField(key, values[key], values) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    const newErrors: Record<FieldKey, string> = {
      nickname: validateField('nickname', values.nickname, values),
      id: validateField('id', values.id, values),
      password: validateField('password', values.password, values),
      passwordConfirm: validateField('passwordConfirm', values.passwordConfirm, values),
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;
    try {
      await postSignup({ routinerId: values.id, nickname: values.nickname, password: values.password });
      navigate('/');
    } catch {
      setSubmitError('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full">
      <div className="flex flex-col gap-4">
        {FIELDS.map(({ label, placeholder, type, key }) => (
          <div key={key} className="flex flex-col gap-1">
            <label className={`${typo.B4_Sb} tracking-[0.6px] text-[#3D4A3E] self-stretch`}>
              {label}
            </label>
            <input
              type={type}
              value={values[key]}
              onChange={(e) => handleChange(key, e.target.value)}
              onBlur={() => handleBlur(key)}
              placeholder={placeholder}
              className={`pt-[17px] px-4 pb-4 rounded-lg border bg-[#F3F4F5] w-full outline-none ${
                errors[key] ? 'border-red-500' : 'border-[#BCCABB]'
              }`}
            />
            {errors[key] && <p className={`${typo.B4_Sb} text-red-500`}>{errors[key]}</p>}
          </div>
        ))}
      </div>
      {submitError && <p className={`${typo.B4_Sb} text-red-500 mt-2`}>{submitError}</p>}
      <Button type="submit" className="mt-[30px] self-center">
        계정 생성하기
      </Button>
    </form>
  );
}
