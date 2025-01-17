import React, { useEffect } from "react";
import { Grid, Button, Line, Text, Badge } from "../elements/";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import FavoriteIcon from "@material-ui/icons/Favorite";
import coffee from "../images/coffee.JPG";

import { history } from "../redux/configureStore";
import { actionCreators as likeActions } from "../redux/modules/like";

const LikeCard = (props) => {
  const dispatch = useDispatch();

  const {
    product: {coffeeBrand, coffeeId, coffeeImg, coffeeInfo, coffeeName, coffeePrice},
  } = props;
  
  console.log(coffeeBrand);

  //가격에 정규식 붙이는 표현
  const coffee_price = coffeePrice
  .toString()
  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  // 좋아요 추가는 메인/디테일 에서
  // => 하트 만들기!

  // 좋아요 삭제
  const deleteLike = () => {
    dispatch(likeActions.deleteLikeAPI(coffeeId));
  };

  return (
    <>
      <Card>
        <ImageBox>
          <ProductImg bgimg={coffeeImg}>
            <Badge scale="0.9" margin="0.5vmin 0.5vmin auto auto">
              {coffeeBrand}
            </Badge>
          </ProductImg>
          <Grid
            textAlign="left"
            width="50%"
            onClick={() => {
              history.push("/");
            }}
          >
            <h3>{coffeeName}</h3>
            <h4>{coffeeInfo}</h4>
            <h5>
              <span>{coffee_price}</span>원
            </h5>
          </Grid>
          <FavoriteIcon className="heartIcon" onClick={deleteLike} />
        </ImageBox>
      </Card>
    </>
  );
};

const Card = styled.div`
  z-index: 1;
  width: 22rem;
  background-color: #ffffff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.07);
  border-radius: 20px;
  padding: 1rem;
  margin: 0.5rem;
  flex-grow: 1;
  ${(props) => (props.onClick ? "cursor:pointer;" : "cursor:auto;")}
  .heartIcon {
    color: #f6afaf;
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
    margin: 0.25rem;
  }
`;

const ProductImg = styled.div`
  background-image: ${(props) => `url(${props.bgimg})`};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.07);
  margin: auto 1rem auto auto;
  width: 8rem;
  height: 8rem;
  border-radius: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  text-align: right;
`;

const ImageBox = styled.div`
  display: flex;
  //커피이름
  h3 {
    font-size: 20px;
    line-height: 120%;
    text-align: left;
  }
  //리뷰
  h4 {
    margin-top: -12px;
    font-size: 16px;
    line-height: 120%;
    font-weight: 500;
    text-align: left;
    // 줄넘김 방지
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-box;
  }
  h5 {
    margin-top: -5px;
    span {
      font-weight: bold;
      size: 18px;
    }
  }
`;

export default LikeCard;