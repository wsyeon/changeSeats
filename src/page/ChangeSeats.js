import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    // 전체 테두리
`;

const InputWrapper = styled.div`
    // 인풋 담는 컨테이너
`;

const Input = styled.input`
    // 인풋
`;

const ChairWrapper = styled.div`
    display: grid;
    grid-template-columns: ${props=> `1fr repeat(${props.numColumns - 1}, 1fr)`};
    grid-template-rows: ${props=> `1fr repeat(${props.numRows - 1}, 1fr)`};
`;

const Chair = styled.div`
    width: auto;
    height: 40px;
    border: 1px solid red;
    text-align: center;
    background-color: ${props => props.colors ? 'black' : 'white'};
`;

const BtnWrapper = styled.div`
    // 버튼 담는 컨테
`;

const Button = styled.button`
    // 버튼
`;

const ChangeSeats = () => {
    const [cols, setCols] = useState(0);
    const [rows, setRows] = useState(0);
    const [nums, setNums] = useState([]);
    const [hide, setHide] = useState([]);
    const [hideArr, setHideArr] = useState([]);
    const [chInput, setChInput] = useState(false);

    const change = e=> {
        const { target: { name, value } } = e;
        
        if (name === 'cols') setCols(value);
        if (name === 'rows') setRows(value);
    };

    useEffect(()=> {
        console.log("nums: ",nums);
        console.log("hide: ",hide);
        console.log("hideArr: ",hideArr);
    }, [nums, hide, hideArr]);

    useEffect(()=> {
        setNums(Array.from({ length: rows * cols }).fill(false));
        setHide(Array.from({ length: rows * cols }).fill(false));
        setHideArr([]);
    }, [rows, cols]);

    const Change = ()=> {
        if (chInput) {
            if ((rows <= 0 || rows > 10) || (cols <= 0 || cols > 10)) {
                alert('1 ~ 10 사이 값으로 지정해주세요');
                setCols(0);
                setRows(0);

                return false;
            }
        }

        const numInfo = Array.from({ length: (rows * cols) - hideArr.length}, (_, idx)=> idx + 1);
        numInfo.sort(()=> Math.random() - 0.5);
        hideArr.map(hideIndex=> {
            return numInfo.splice(hideIndex, 0, true);
        });
        setNums(numInfo);
    };

    const ChangeColor = e=> {
        const idx = e.target.dataset.value;
        setHide(pre=> {
            const newHide = [...pre];
            newHide[idx] = !newHide[idx];
            return newHide;
        });
        setHideArr(prev => {
            const index = parseInt(idx, 10);
            if (prev.includes(index)) {
              return prev.filter(item => item !== index);
            } else {
                const newArr = [...prev, index];
                newArr.sort((a, b) => a - b);
                return newArr;
            }
        });
    };

    const Reset = ()=> {
        setNums(Array.from({ length: rows * cols }).fill(false)); 
        setHideArr([]); 
        setHide(Array.from({ length: rows * cols }).fill(false));
    };

    const changeInput = ()=> setChInput(!chInput);

    return (
        <Wrapper>
            {chInput ? (
                <InputWrapper>
                    <Input type='number' name='cols' min="1" max="10" value={cols} onChange={change} />
                    <Input type='number' name="rows" min="1" max="10" value={rows} onChange={change} />
                </InputWrapper>
            ) : (
                <InputWrapper>
                    <Input type='range' name='cols' min="1" max="10" value={cols} onChange={change} />{cols}
                    <Input type='range' name="rows" min="1" max="10" value={rows} onChange={change} />{rows}
                </InputWrapper>
            )}
            <ChairWrapper numColumns={cols} numRows={rows}>
              {hide.map((data, idx)=> {
                if (data === true) {
                    return <Chair data-value={idx} key={idx} onClick={ChangeColor} colors={hide[idx]}></Chair>
                } else {
                    return <Chair data-value={idx} key={idx} onClick={ChangeColor} colors={hide[idx]}>
                                {nums[idx]}
                            </Chair> 
                }
              })}
            </ChairWrapper>
            <BtnWrapper>
                <Button onClick={Change}>자리 배치</Button>
                <Button onClick={Reset}>초기화</Button>
                <Button onClick={changeInput}>{chInput ? '스크롤' : '입력창'}</Button>
            </BtnWrapper>
        </Wrapper>
    );
};

export default ChangeSeats;