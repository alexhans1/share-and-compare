import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export default class BanksPagination extends React.Component {
  render() {
    const { banksData, } = this.props;
    let previous = (banksData.paging.page > 1) ?
      <PaginationItem>
        <PaginationLink previous href="#" />
      </PaginationItem>
      :
      <PaginationItem disabled>
        <PaginationLink previous href="#" />
      </PaginationItem>;

    let next = (banksData.paging.page === banksData.paging.pageCount) ?
      <PaginationItem disabled>
        <PaginationLink next href="#" />
      </PaginationItem>
      :
      <PaginationItem>
        <PaginationLink next href="#" />
      </PaginationItem>;

    let paginationItems = [];
    for (let i = 1; i <= 5; i++) {
      if (banksData.paging.page < 3) {
        paginationItems.push({
          active: (banksData.paging.page === i),
          number: i,
        })
      }
    }
    return (
      <Pagination className="justify-content-center">
        {previous}
        {paginationItems.map((paginationItem) => {
          return <PaginationItem active={paginationItem.active} key={paginationItem.number}>
            <PaginationLink href="#">
              {paginationItem.number}
            </PaginationLink>
          </PaginationItem>
        })}

        {/*<PaginationItem active>*/}
          {/*<PaginationLink href="#">*/}
            {/*1*/}
          {/*</PaginationLink>*/}
        {/*</PaginationItem>*/}
        {/*<PaginationItem>*/}
          {/*<PaginationLink href="#">*/}
            {/*2*/}
          {/*</PaginationLink>*/}
        {/*</PaginationItem>*/}
        {/*<PaginationItem>*/}
          {/*<PaginationLink href="#">*/}
            {/*3*/}
          {/*</PaginationLink>*/}
        {/*</PaginationItem>*/}
        {/*<PaginationItem>*/}
          {/*<PaginationLink href="#">*/}
            {/*4*/}
          {/*</PaginationLink>*/}
        {/*</PaginationItem>*/}
        {/*<PaginationItem>*/}
          {/*<PaginationLink href="#">*/}
            {/*5*/}
          {/*</PaginationLink>*/}
        {/*</PaginationItem>*/}
        {next}
      </Pagination>
    );
  }
}
