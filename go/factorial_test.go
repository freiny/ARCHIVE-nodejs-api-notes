package challenge

import (
	"testing"

	"github.com/freiny/go-util/ftest"
)

func Factorial(n int) int {
	return n
}

func TestFactorial(t *testing.T) {
	tests := []ftest.Test{
		{1, Factorial(0), 1},
		{2, Factorial(5), 120},
		{3, Factorial(7), 5040},
	}
	ftest.Assert(t, tests, func(s string) { t.Errorf(s) })
}
